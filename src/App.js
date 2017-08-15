import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

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

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div>
        {/* use render prop in order to pass in app state */}
        <Route exact path="/" render={() => (
          <ListContacts contacts={this.state.contacts} 
            deleteContact={this.deleteContact} />
        )} />

        <Route path="/create" render={({ history }) => (
          <CreateContact 
            onCreateContact={(contact) => {
              this.createContact(contact)
              {/* after create contact return to main list */}
              history.push('/')

            }}
          />
        )} />
      </div>
    )
  }
}

export default App;
