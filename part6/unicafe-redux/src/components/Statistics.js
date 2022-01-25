import React from "react";
import StatisticsLine from "./StatisticsLine";

const Statistics = ({good, neutral, bad}) =>{
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

  export default Statistics;