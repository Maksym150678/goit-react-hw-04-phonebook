import { Component } from 'react';

import { nanoid } from 'nanoid';

import FormAddPhonebook from './FormAddPhonebook/FormAddPhonebook';
import PhonebookList from './PhonebookList/PhonebookList';
import styles from './phonebook.module.css';

class Phonebook extends Component {
  state = {
    phonebook: [],
    filter: '',
  };

  componentDidMount () {
    const phonebook = JSON.parse(localStorage.getItem('phonebook'));
    if(phonebook?.length) {
      this.setState({
      phonebook, 
    })
    }
    
  }

  componentDidUpdate (_, prevState) {
    const {phonebook} = this.state;
    if(prevState.phonebook !== phonebook){
      localStorage.setItem('phonebook', JSON.stringify(phonebook));
    }
    
  }

  addContact = data => {
    if (this.isDublicate(data)) {
      return alert(`${data.name} - ${data.number} is alredy in contacts.`);
    }
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return {
        phonebook: [...prevState.phonebook, newContact],
      };
    });
  };

  removeContact = id => {
    this.setState(({ phonebook }) => {
      const newPhonebook = phonebook.filter(item => item.id !== id);

      return {
        phonebook: newPhonebook,
      };
    });
  };

  handleFilter = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isDublicate({ name, number }) {
    const { phonebook } = this.state;
    const result = phonebook.find(item => item.name === name && item.number === number);
    return result;
  }

  getFilteredPhonebook() {
    const { phonebook, filter } = this.state;

    if (!filter) {
      return phonebook;
    }

    const normalizedFilter = filter.toLocaleLowerCase();

    const filteredPhonebook = phonebook.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const normalizedNumber = number.toLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) ||
        normalizedNumber.includes(normalizedFilter);
      return result;
    });

    return filteredPhonebook;
  }

  render() {
    const { addContact, removeContact, handleFilter } = this;

    const phonebook = this.getFilteredPhonebook();

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <div className={styles.row}>
          <div className={styles.column}>
            <FormAddPhonebook onSubmit={addContact} />
          </div>
          <div>
            <PhonebookList items={phonebook} removeContact={removeContact} />
            <input
              name="filter"
              onChange={handleFilter}
              className={styles.filter}
              placeholder="Filter"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Phonebook;
