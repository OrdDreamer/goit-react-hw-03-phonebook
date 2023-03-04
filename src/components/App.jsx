import { Component } from 'react';
import styles from './app.module.css';
import Section from './Section/Section';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

export default class App extends Component {

  state = {
    contacts: [],
    filter: '',
  };


  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts && contacts.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevData = JSON.stringify(prevState.contacts);
    const nextData = JSON.stringify(this.state.contacts);
    if (prevData !== nextData) {
      localStorage.setItem('contacts', nextData);
    }
  }

  addContact = ({ name: n, number }) => {
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
            <ContactsList contacts={contacts} deleteContact={this.deleteContact} />
          </Section>
        </div>
      </div>
    );
  }
};
