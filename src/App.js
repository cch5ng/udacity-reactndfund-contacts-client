import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts });
    })
  }

  deleteContact = this.deleteContact.bind(this);

  deleteContact(tcontact) {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(contact => {
       return contact.id !== tcontact.id
      })
    }))
    ContactsAPI.remove(tcontact).then((contact) => {
      if (!contact.length) {
        console.log('error removing contact')
      }
    })
  }

  render() {
    return (
      <div>
      	<ListContacts contacts={this.state.contacts} deleteContact={this.deleteContact} />
      </div>
    )
  }
}

export default App;
