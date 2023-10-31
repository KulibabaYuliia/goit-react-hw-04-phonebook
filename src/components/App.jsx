import { ContactsList } from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    return parsedContacts;
  });

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const handleAddContact = contactData => {
    const hasDuplicates = contacts.some(
      contact =>
        contact.name.toLocaleLowerCase() ===
        contactData.name.toLocaleLowerCase()
    );

    if (hasDuplicates) {
      alert(`${contactData.name} is already in contacts.`);
      return;
    }

    contactData.id = nanoid();
    setContacts(prevState =>
      [...prevState, contactData].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const onChangeFilterHandler = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div
      style={{
        padding: '20px',
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter
        fliterValue={filter}
        onChangeFilterHandler={onChangeFilterHandler}
      />
      <ContactsList
        contacts={filteredContacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
