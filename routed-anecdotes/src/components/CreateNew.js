import React from "react";
import { useField } from "../hooks";
const CreateNew = ({addNew}) => {
    const content = useField('text');
    const author = useField('text');
    const info = useField('text');
   
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.form.value,
        author: author.form.value,
        info: info.form.value,
        votes: 0
      })
    }

    const resetFields = () =>{
      content.reset();
      author.reset();
      info.reset();
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content:  <input {...content.form}/>
          </div>
          <div>
            author: <input {...author.form}/>            
          </div>
          <div>
            url for more info: <input {...info.form}/>
          </div>
          <button type='submit'>create</button>
          <button type='reset' onClick={resetFields}>reset</button>
        </form>
      </div>
    )
  
}

export default CreateNew;