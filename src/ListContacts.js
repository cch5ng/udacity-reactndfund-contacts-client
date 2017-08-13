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

  searchInputUpdate = this.searchInputUpdate.bind(this);
  resetContacts = this.resetContacts.bind(this);

  searchInputUpdate(queryInp) {
    //console.log('ev.target.value: ' + ev.target.value);
    this.setState({ query: queryInp.trim() });
  }

  resetContacts() {
    this.setState({ query: ""});
  }

  render() {
    const { contacts, deleteContact} = this.props;
    const { query } = this.state;
    let showingContacts

    if (this.state.query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      // filter contacts prop based on whether contact name contains the match regex
      showingContacts = contacts.filter(contact => (match.test(contact.name)
      ))
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy('name'));

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
        { showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Now showing {showingContacts.length} of {contacts.length} total.</span>
            <button onClick={this.resetContacts}> Show All.</button>
          </div>
        )}
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
              <button id={contact.id} className="contact-remove" onClick={(ev) => deleteContact(contact)}>
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
