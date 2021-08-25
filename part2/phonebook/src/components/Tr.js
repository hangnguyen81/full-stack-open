import React from 'react'

const Tr = (props) =>{
    const contact = props.contact
    return(
        <tr>
            <td>{contact.firstName} {contact.lastName}</td>
            <td>{contact.number}</td>
        </tr>
    )
}

export default Tr