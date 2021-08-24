import React, {useState} from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const numberOfAnecdotes = anecdotes.length
  //States
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  //create a zero-filled array of a length of anecdotes.length.
  const initialPoints = new Array(numberOfAnecdotes).fill(0)
  const [points, setPoints] = useState(initialPoints)

  const handleClick = () =>{  
    const randomNum = Math.floor(Math.random()*numberOfAnecdotes)
    setSelected(randomNum)
  }

  const handleVote = () =>{
    const newPoints = [...points]
    newPoints[selected] += 1 
    setPoints(newPoints) 
    if(points[mostVoted] <= points[selected] )
      setMostVoted(selected)
  }

return (
    <div className='container'>
      <div className='anecdotes'>
          <h2>Anecdote of day</h2>
          <p>{anecdotes[selected]}</p>
          <p> has {points[selected]} votes</p>
      </div>
      <div className='anecdotes-actions'>
        <Button text='Vote Anecdote' onClick={handleVote}/>
        <Button text='Next Anecdote' onClick={handleClick}/>        
      </div>  
      <div className='anecdotes-most-vote'>
        <h2>Anecdote with most vote</h2>
        <i>{anecdotes[mostVoted]}</i>
        <p> has {points[mostVoted]} votes</p>
      </div>    
    </div>
  )
}


export default App;
