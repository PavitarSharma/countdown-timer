import {useState } from "react";
import TimerForm from "./components/TimerForm/TimerForm";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";

const App = () => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [message, setMessage] = useState("");


  const { days, hours, minutes, seconds } = time;
  return (
    <div className="container">
      <h1 className="title">
        Countdown <span>Timer</span>
      </h1>

      <TimerForm setTime={setTime} setMessage={setMessage} />
      {
        message ? (
          <div className="message">{message}</div>
        ) : (
          <TimerDisplay days={days} hours={hours} minutes={minutes} seconds={seconds} />
        )
      }
    </div>
  );
};

export default App;
