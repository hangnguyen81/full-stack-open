import React, {useState} from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>  
      <td>{props.value}</td>
    </tr>
  )}


const Statistics = (props) =>{
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const totalFeedback = good + neutral + bad
  if (totalFeedback === 0)
  return (
    <p>No feedback given</p>
  )
  return(
    <table>
      <tbody>
        <StatisticsLine text='Good' value={good}/>
        <StatisticsLine text='Neutral' value={neutral}/>
        <StatisticsLine text='Bad' value={bad}/>
        <StatisticsLine text='Total feedback' value={totalFeedback}/>
        <StatisticsLine text='Average points' value={(good + neutral*0 + bad*-1)/totalFeedback}/>
        <StatisticsLine text='Positive feedback' value={good/totalFeedback*100 + '%'}/>
      </tbody>
    </table>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)

  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

  return (
    <div className="feedback-container">
      <div className = 'feedback-input'>
        <h2>Leave your feedback for Unicafe </h2>
        <Button onClick={handleGoodClick} text='Good'/>
        <Button onClick={handleNeutralClick} text='Neutral'/>
        <Button onClick={handleBadClick} text='Bad'/>
      </div>
      <div className = 'feedback-output'>
        <h2>Feedback statistics </h2>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  );
}

export default App;
