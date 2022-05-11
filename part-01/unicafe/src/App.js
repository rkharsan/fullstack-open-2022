import { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;
  const average = (good - bad) / sum;
  const positive = (good / sum) * 100;

  if (sum === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>statistic</th>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={sum} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const voteGood = () => setGood(good + 1);
  const voteNeutral = () => setNeutral(neutral + 1);
  const voteBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give Feedback to Unicafe</h1>

      <Button text="Good" onClick={voteGood} />
      <Button text="Neutral" onClick={voteNeutral} />
      <Button text="Bad" onClick={voteBad} />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
