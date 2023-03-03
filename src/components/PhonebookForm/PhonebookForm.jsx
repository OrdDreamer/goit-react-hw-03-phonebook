import styles from './phonebook-form.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

export default class PhonebookForm extends Component {

  constructor(props) {
    super(props);
    this.addContact = props.addContact;
    this.state = {
      name: '',
      number: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.addContact({ ...this.state })) {
      this.reset();
    }
  };

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  reset() {
    this.setState({ name: "", number: "" });
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <div className={styles.formItem}>
          <p>Name:</p>
          <input
            value={this.state.name}
            onChange={this.handleChange}
            className={styles.formInput}
            type='text'
            name='name'
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={styles.formItem}>
          <p>Number:</p>
          <input
            value={this.state.number}
            onChange={this.handleChange}
            className={styles.formInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button className={styles.addButton} type='submit'>Add contact</button>
      </form>
    );
  }
};

PhonebookForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
