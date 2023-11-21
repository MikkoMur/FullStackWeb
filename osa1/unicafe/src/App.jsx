import { useState } from 'react'

const StatisticLine = ({text,value}) => {
  return (
    <p>{text}: {value}</p>
  )
}

const Statistics = ({numGood, numNeutral, numBad}) => {
  const all = numGood + numNeutral + numBad
  if (all > 0){
    const avg = (numGood - numBad) / all
    const positive = numGood*100 / all
    return (
      <div>
        <StatisticLine text="good" value={numGood}/>
        <StatisticLine text="neutral" value={numNeutral}/>
        <StatisticLine text="bad" value={numBad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={avg}/>
        <StatisticLine text="positive" value={positive}/>
      </div>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>
      <h1>Statistics</h1>
      <Statistics numGood={good} numNeutral={neutral} numBad={bad}/>
    </div>
  )
}

export default App