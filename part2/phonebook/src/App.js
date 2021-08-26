import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ListContacts from "./components/ListContacts";
import AddContact from "./components/AddContact";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([])
  const [displayContacts, setDisplayContacts] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [number, setNumber] = useState('')

  //fetching data from json-server
  const fetchData = () =>{
    axios
      .get('http://localhost:3001/contacts')
      .then(response => {
        setContacts(response.data)
        setDisplayContacts(response.data)
      })
  }

  useEffect(fetchData,[])


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



  const addContact = (event) =>{
    event.preventDefault()
    //if no input data, alert then no adding to contacts array
    if(firstName === '' || lastName === '' || number ==='')
      return window.alert('Please enter all fields of contact')
    const newContact = {
      id: contacts.length +1,
      firstName: firstName,
      lastName: lastName,
      number: number
    }
    //check contact is already existed or not
    const found = contacts.find(contact => contact.firstName ===newContact.firstName && contact.lastName === newContact.lastName)
    if(found)
      return window.alert(`${newContact.firstName} ${newContact.lastName} is already existed in phonebook`)
    else{
      const newContacts = contacts.concat(newContact)
      setContacts(newContacts)
      setDisplayContacts(newContacts)
      setFirstName('')
      setLastName('')
      setNumber('')
      
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
          {<ListContacts list={displayContacts}/>}
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
