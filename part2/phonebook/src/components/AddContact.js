
const AddContact = (props) =>{
  const {fname, lname, num, onSubmit, handleFname, handleLname, handleNumber} = props
    return(
        <div className='new-contact'>
          <h3>new contact</h3>
          <form onSubmit={onSubmit} autoComplete="off">
            <label>First name
              <input 
                type='text' 
                value={fname}
                name='firstName'
                onChange = {handleFname} 
                placeholder='Enter first name'
              />
            </label>  
            <label>Last name
              <input 
                type='text' 
                value={lname}
                name='lastName'
                onChange = {handleLname} 
                placeholder='Enter last name'
              />
            </label>    
            <label>Phone number
              <input type='text' 
                  value={num}
                  name='number'
                  onChange = {handleNumber} 
                  placeholder='Enter phone number'
            />
            </label>
            <button type='submit'>Add contact</button>
          </form>
        </div>
    )
}

export default AddContact