import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
  static proptypes = {
    contacts: PropTypes.array.isRequired,
    deleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ""
  }

  searchInputUpdate(queryInp) {
    //console.log('ev.target.value: ' + ev.target.value);
    this.setState({ query: queryInp.trim() });
  }

  render() {
    const { contacts, deleteContact} = this.props;
    let showingContacts

    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      // filter contacts prop based on whether contact name contains the match regex
      showingContacts = contacts.filter(contact => (match.test(contact.name)
      ))
    } else {
      showingContacts = contacts;
    }

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input 
            type="text"
            className="search-contacts"
            placeholder="Search contacts"
            value={this.state.query} 
            onChange={(ev) => this.searchInputUpdate(ev.target.value)} />
        </div>
        <ol className="ordered-list">
          {showingContacts.map((contact, idx) => (
            <li key={contact.id} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.avatarURL})` 
              }}></div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button id={contact.id} className="contact-remove" onClick={(ev) => deleteContact(ev.target.id)}>
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
