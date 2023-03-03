import { Component } from 'react';
import styles from './app.module.css';
import Section from './Section/Section';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: "",
    };
  }

  addContact = ({name: n, number}) => {
    const name = n.toLowerCase();

    if (this.state.contacts.find(e => e.name === name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    this.setState((prevState) => ({
      contacts: [{
        name,
        number,
        id: String(+(new Date())) + Math.round(Math.random() * 100),
      }, ...prevState.contacts],
    }));
    return true;
  };

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(e => e.id !== id),
    }));
  };

  changeFilter = (v) => {
    this.setState({ filter: v.toLowerCase() });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(c =>
      c.name.includes(filter),
    );
  };

  render() {
    const contacts = this.getVisibleContacts();

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          color: '#010101',
          padding: '50px',
          backgroundColor: 'rgb(231, 236, 242)',
          boxSizing: 'border-box',
        }}
      >
        <div className={styles.phonebook}>
          <Section title={'Phonebook'}>
            <PhonebookForm addContact={this.addContact} />
          </Section>
          <Filter term={this.state.filter} setTerm={this.changeFilter} />
          <Section title={'ContactsList'}>
            <ContactsList contacts={contacts} deleteContact={this.deleteContact}/>
          </Section>
        </div>
      </div>
    );
  }
};
