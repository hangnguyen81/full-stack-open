import React, {useState}  from "react";

const Header = (props) =>(<h1>{props.course.courseName}</h1>)

const Content = (props) =>{
  const partArr = props.course.parts
  return (
    <div>
      {partArr.map(item =>{
        return <Part key = {item.partName} part = {item} />
      })}
    </div>
  )

} 

const Part = (props) =>(<p>{props.part.partName}: {props.part.exercises}</p>)

const Total = (props) => {
  let sum = 0
  props.course.parts.map(ex => sum += ex.exercises) 
  return (
    <p>Total number of exercise: {sum}</p>)
}
//Component for later exercises
const Display = ({counter}) =><h2>{counter}</h2>

const Button = ({onClick,text}) =><button onClick={onClick}>{text}</button>

const History = (props) =>{
  if (props.allClicks.length === 0){
    return (
      <p>The app is used by pressing the buttons</p>
    )
  }
  return(
    <p>Button press history: {props.allClicks.join(' ')}</p>
  )
}

const App = () => {

  const course = {
    courseName: 'Half Stack application development',
    parts: [{
      partName: 'Fundamentals of React',
      exercises: 10
    },
    {
      partName: 'Using props to pass data',
      exercises: 7
    },
    {
      partName: 'State of a component',
      exercises: 14
    }
  ]}

  /* React Hook and useState() */
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)



  /*Complex state*/
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat('L'))
    setLeft(left + 1)
  }
  const handleRightClick = () =>{
    setAllClicks(allClicks.concat('R'))
    setRight(right + 1)
  } 


  return (
    <>
      <Header course = {course}/>
      <Content course = {course}/>
      <Total course = {course}/>

      <div className='counter'>
        <Display counter = {counter}/>
        <br/>
        <Button 
          onClick={increaseByOne}
          text = 'Click Me! +'
        />
        <Button 
          onClick={setToZero}
          text = 'Reset me to 0'
        />
        <Button 
          onClick={decreaseByOne}
          text = 'Click Me! -'
        />
      </div>

      <div className='counter'>
        <div className='left-right'>
          <Display counter = {left} />
          <Display counter = {right} />
        </div>
        <div className='left-right'>
          <Button onClick={handleLeftClick} text = 'Increase the left'/>
          <Button onClick={handleRightClick} text = 'Increase the right'/>
        </div>
        <History allClicks={allClicks}/>
      </div>
    </>
  );
}

export default App;
