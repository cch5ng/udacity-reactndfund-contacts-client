import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
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

  render() {
    return (
      <div>
        {/* use render prop in order to pass in app state */}
        <Route exact path="/" render={() => (
          <ListContacts contacts={this.state.contacts} 
            deleteContact={this.deleteContact} 
            updateScreen={this.updateScreen} />
        )} />

        <Route path="/create" component={CreateContact} />
        )} />
      </div>
    )
  }
}

export default App;
