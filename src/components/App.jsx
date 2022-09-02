import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';
import FormAddPhonebook from 'components/Phonebook/FormAddPhonebook/FormAddPhonebook';
import PhonebookList from 'components/Phonebook/PhonebookList/PhonebookList';
import styles from 'components/app.module.css';

const App = () => {
  const [phonebook, setPhonebook] = useState(() => {
    const value = JSON.parse(localStorage.getItem('phonebook'));
    return value || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(phonebook));
  }, [phonebook]);

  const addContact = (data) => {
    if(isDublicate(data)) {
      return alert(`${data.name} - ${data.number} is alredy in contacts.`);
    }
    setPhonebook(prevPhonebook => {
      const newContact = {
        ...data,
        id: nanoid(),
      };
      return [...prevPhonebook, newContact];
    })
  };

  const removeContact = (id) => {
    setPhonebook(prevPhonebook => prevPhonebook.filter(item => item.id !== id));
  }

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  }

  const isDublicate = ({ name, number }) => {
    const result = phonebook.find(
      item => item.name === name && item.number === number
    );
    return Boolean(result);
  };

  const getFilteredPhonebook = () => {
    if (!filter) {
      return phonebook;
    }

    const normalizedFilter = filter.toLowerCase();

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

  const filteredPhonebook = getFilteredPhonebook();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <div className={styles.row}>
        <div className={styles.column}>
          <FormAddPhonebook onSubmit={addContact} />
        </div>
        <div>
          <PhonebookList
            items={filteredPhonebook}
            removeContact={removeContact}
          />
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
};

export default App;
