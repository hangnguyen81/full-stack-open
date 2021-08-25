import Tr from './Tr'

const ListContacts = (props) =>{
    return(
        <table id='table-contact-list'>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Phone</th>
              </tr>
              {props.list.map(contact =><Tr key = {contact.id} contact = {contact}/>)}
            </tbody>
          </table>
    )
}

export default ListContacts