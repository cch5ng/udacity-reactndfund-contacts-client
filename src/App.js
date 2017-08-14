import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    screen: 'list', // 'list' || 'create'
    contacts: []
  }

  updateScreen = this.updateScreen.bind(this);

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

  updateScreen(screenStr) {
    this.setState({ screen: screenStr });
  }

  render() {
    return (
      <div>
        { this.state.screen === 'list'
          ? <ListContacts contacts={this.state.contacts} deleteContact={this.deleteContact} updateScreen={this.updateScreen} />
          : <CreateContact />
        }
      </div>
    )
  }
}

export default App;
