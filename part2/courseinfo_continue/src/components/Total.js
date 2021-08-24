import React from 'react'

// Calculate Total by map method
/*
const Total = (props) => {
  let sum = 0
  props.parts.map(part => sum += part.exercises) 
  return (
    <p className='total-exercises'>Total of {sum} exercise</p>)
}
*/
// using Reduce()
const Total = ({parts}) =>{
  const sum = parts.reduce((s,p) => s + p.exercises,0)
  return (
    <p className='total-exercises'>Total of {sum} exercise</p>
  )
}

export default Total