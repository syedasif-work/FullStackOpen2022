import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad;

  if (all !== 0) {
    return (
      <>
        <h2>Statistics</h2>
    
        <table>
          <tbody>
            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="All" value={good + bad + neutral} />
            <StatisticsLine text="Average" value={(good - bad) / (all)} />
            <StatisticsLine text="Positive" value={`${good/all} %`} />
          </tbody>
        </table>
      </>
      )
  }
  return (
    <>
      <h2>Statistics</h2>
      <p> No Feedback Given</p>
    </>
  )

  
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> Give Feedback </h1>

      <Button handleClick={() => setGood(good+1)} text= 'good' />
      <Button handleClick={() => setNeutral(neutral+1)} text= 'neutral' />
      <Button handleClick={() => setBad(bad+1)} text= 'bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App