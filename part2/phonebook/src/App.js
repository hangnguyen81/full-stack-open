import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Contact from "./components/Contact";
import AddContact from "./components/AddContact";
import contactsService from "./services/contacts";
import Notification from "./components/Notification";

function App() {
  const [contacts, setContacts] = useState([])
  const [displayContacts, setDisplayContacts] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [number, setNumber] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() =>{
    contactsService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
        setDisplayContacts(initialContacts)
      })
  },[])

  const handleFnameChange = event =>setFirstName(event.target.value)
  const handleLnameChange = event =>setLastName(event.target.value)
  const handleNumberChange = event =>setNumber(event.target.value)

  const searchContact = (event) =>{
    let searchQuery = event.target.value.toLowerCase()
    setDisplayContacts(contacts.filter(contact =>{
      let fullName   = contact.firstName + ' '+ contact.lastName
      return fullName.toLowerCase().includes(searchQuery)
    }))
  }

  const resetForm = () =>{
    setFirstName('')
    setLastName('')
    setNumber('') 
  }

  const notifyText = (message,type='success') =>{
    setNotification({ message, type })
    setTimeout(() => {setNotification(null)}, 3000)
  }

  const addContact = (event) =>{
    event.preventDefault()
    //if no input data, alert then no adding to contacts array
    if(firstName === '' || lastName === '')
      return window.alert('Please enter all fields of contact')
    const newContact = {
//      id: contacts.length +1,
      firstName: firstName,
      lastName: lastName,
      number: number
    }
    //check contact is already existed or not
    const found = contacts.find(contact => contact.firstName ===newContact.firstName && contact.lastName === newContact.lastName)
    if(found){
      const id=found.id
      if(window.confirm(`${newContact.firstName} ${newContact.lastName} is already existed in phonebook, replace the old number with the new one`)){
        contactsService
        .updateContact(id,newContact)
        .then(returnedContact =>{ 
            const updatedContacts = contacts.map(contact => contact.id !== id? contact : returnedContact)
            setContacts(updatedContacts)
            setDisplayContacts(updatedContacts)   
            notifyText(`The new phone number of ${returnedContact.firstName} ${returnedContact.lastName} is updated`)  
        })
      }
        resetForm()
    }      
    else{
      contactsService
        .create(newContact)
        .then(returnedContact =>{
          const newContacts = contacts.concat(returnedContact)
          setContacts(newContacts)
          setDisplayContacts(newContacts)
          notifyText(`${returnedContact.firstName} ${returnedContact.lastName} is added to phonebook`)
        })
        resetForm()  
    }
  }

  const deleteContactOf = id =>{
    if(window.confirm(`Do you really want to delete this contact from phonebook`)){
      contactsService
        .deleteContact(id)
        .catch(error =>{
          const DeletedContact = contacts.find(contact => contact.id === id)
          notifyText(`Information of ${DeletedContact.firstName} ${DeletedContact.lastName} has already been removed from server`,'error')
        })
      const afterDeleteContacts = contacts.filter(contact => contact.id !== id)
      setContacts(afterDeleteContacts)
      setDisplayContacts(afterDeleteContacts)
    }
  }

  return (
    <div className="container">
      <header>Awesome react phone book</header>
      <main className='main'>
        { <AddContact 
            fname = {firstName}
            lname = {lastName}
            num = {number}
            onSubmit= {addContact} 
            handleFname={handleFnameChange}
            handleLname = {handleLnameChange}
            handleNumber = {handleNumberChange}
        />
        }
        <div className = 'contact-list'>
          {<SearchBar onChange={searchContact}/> }
          <Notification notification = {notification} />
          <table id='table-contact-list'>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th></th>
              </tr>
              {displayContacts.map(contact =>
                <Contact 
                  key={contact.id} 
                  contact={contact}
                  deleteContact = {() =>deleteContactOf(contact.id)}
                  />
              )}
            </tbody>
          </table>
          
          <p className='subtitle left'>
            This phone book has<span className='number-of-contacts'>{contacts.length} </span> contacts
          </p>
        </div>
      </main>
      <footer className='subtitle'>Awesome Phonebook@Hang Nguyen - 2021</footer>
    </div>
  );
}

export default App;
