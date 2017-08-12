import React from 'react';
import PropTypes from 'prop-types';

const ListContacts = (props) => {
    return (
      <ol className="ordered-list">
        {props.contacts.map((contact, idx) => (
          <li key={contact.id} className="contact-list-item">
            <div className="contact-avatar" style={{
              backgroundImage: `url(${contact.avatarURL})` 
            }}></div>
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button id={contact.id} className="contact-remove" onClick={(ev) => props.deleteContact(ev.target.id)}>
            </button>
          </li>
        ))}

      </ol>
    )
}

ListContacts.proptypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired
}

export default ListContacts
