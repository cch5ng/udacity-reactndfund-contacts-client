import React, { Component } from 'react';

class ListContacts extends Component {

  render() {
    const { contacts, deleteContact } = this.props;
    return (
      <ol className="ordered-list">
        {contacts.map((contact, idx) => (
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
    )

  }

}

export default ListContacts
