import React from 'react'


const Content = (props) =>{
  const parts = props.parts
  return (
    <div>
      {parts.map(part =>
        <Part key = {part.id} part = {part} />
      )}
    </div>
  )
} 

const Part = (props) =><p>{props.part.name}: {props.part.exercises}</p>

export default Content