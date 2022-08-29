import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

import FormAddPhonebook from './FormAddPhonebook/FormAddPhonebook';
import PhonebookList from './PhonebookList/PhonebookList';
import styles from './phonebook.module.css';

const Phonebook = () => {
  const [phonebook, setPhonebook] = useState(() => {
    const value = JSON.parse(localStorage.getItem('phonebook'));
    return value || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(phonebook))
  }, [phonebook])

  const addContact = (data) => {
    if(isDublicate(data)) {
      return alert(`${data.name} - ${data.number} is alredy in contacts.`);
    }
    setPhonebook(prevPhonebook => {
      const newContact = {
        ...data,
        id: nanoid()
      };
      return [...prevPhonebook, newContact];
    })
  };

  const removeContact = (id) => {
    setPhonebook(prevPhonebook => prevPhonebook.filter(item => item.id !== id));
  }

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };


  const isDublicate = ({name, number}) => {
    const result = phonebook.find(item => item.name === name && item.number === number);
    return Booling(result);
  }
}

const getFilteredPhonebook = () => {
  if (!filter) {
    return phonebook;
  }

  const normalizedFilter = filter.toLowerCase;
  
  const filteredPhonebook = getFilteredPhonebook();

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <div className={styles.row}>
          <div className={styles.column}>
            <FormAddPhonebook onSubmit={addContact} />
          </div>
          <div>
            <PhonebookList items={filteredPhonebook} removeContact={removeContact} />
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

//   const normalizedFilter = filter.toLocaleLowerCase();

//   const filteredPhonebook = phonebook.filter(({ name, number }) => {
//     const normalizedName = name.toLowerCase();
//     const normalizedNumber = number.toLowerCase();
//     const result =
//       normalizedName.includes(normalizedFilter) ||
//       normalizedNumber.includes(normalizedFilter);
//     return result;
//   });

//   return filteredPhonebook;
// }

// class Phonebook extends Component {
//   state = {
//     phonebook: [],
//     filter: '',
//   };

//   componentDidMount () {
//     const phonebook = JSON.parse(localStorage.getItem('phonebook'));
//     if(phonebook?.length) {
//       this.setState({
//       phonebook, 
//     })
//     }
    
//   }

//   componentDidUpdate (_, prevState) {
//     const {phonebook} = this.state;
//     if(prevState.phonebook !== phonebook){
//       localStorage.setItem('phonebook', JSON.stringify(phonebook));
//     }
    
//   }

//   addContact = data => {
//     if (this.isDublicate(data)) {
//       return alert(`${data.name} - ${data.number} is alredy in contacts.`);
//     }
//     this.setState(prevState => {
//       const newContact = {
//         id: nanoid(),
//         ...data,
//       };
//       return {
//         phonebook: [...prevState.phonebook, newContact],
//       };
//     });
//   };

//   removeContact = id => {
//     this.setState(({ phonebook }) => {
//       const newPhonebook = phonebook.filter(item => item.id !== id);

//       return {
//         phonebook: newPhonebook,
//       };
//     });
//   };

//   handleFilter = ({ target }) => {
//     const { name, value } = target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   isDublicate({ name, number }) {
//     const { phonebook } = this.state;
//     const result = phonebook.find(item => item.name === name && item.number === number);
//     return result;
//   }

//   getFilteredPhonebook() {
//     const { phonebook, filter } = this.state;

//     if (!filter) {
//       return phonebook;
//     }

//     const normalizedFilter = filter.toLocaleLowerCase();

//     const filteredPhonebook = phonebook.filter(({ name, number }) => {
//       const normalizedName = name.toLowerCase();
//       const normalizedNumber = number.toLowerCase();
//       const result =
//         normalizedName.includes(normalizedFilter) ||
//         normalizedNumber.includes(normalizedFilter);
//       return result;
//     });

//     return filteredPhonebook;
//   }

//   render() {
//     const { addContact, removeContact, handleFilter } = this;

//     const phonebook = this.getFilteredPhonebook();

//     return (
//       <div className={styles.container}>
//         <h1 className={styles.title}>Phonebook</h1>
//         <div className={styles.row}>
//           <div className={styles.column}>
//             <FormAddPhonebook onSubmit={addContact} />
//           </div>
//           <div>
//             <PhonebookList items={phonebook} removeContact={removeContact} />
//             <input
//               name="filter"
//               onChange={handleFilter}
//               className={styles.filter}
//               placeholder="Filter"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default Phonebook;
