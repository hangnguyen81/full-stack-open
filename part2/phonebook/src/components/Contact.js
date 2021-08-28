
const Contact = ({contact, deleteContact}) =>{
  return(
    <tr>
      <td>{contact.firstName} {contact.lastName}</td>
      <td>{contact.number}</td>
      <td><button onClick={deleteContact}>Delete</button></td>
    </tr>
  )
}

export default Contact