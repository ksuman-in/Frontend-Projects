import { useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [timeInterval, setTimeInterval] = useState(0);

  const handleStart = () => {
    setRunning(true);
    setTimeInterval(
      setInterval(() => {
        setTime((prevState) => prevState + 1);
      }, 10)
    );
  };

  const handlePause = () => {
    setRunning(false);
    clearInterval(timeInterval);
  };
  const handleReset = () => {
    setTime(0);
    clearInterval(timeInterval);
  };

  const milliSeconds = Math.floor(time % 100);
  const seconds = Math.floor((time % 6000) / 100);
  const minutes = Math.floor((time % 360000) / 6000);
  const hours = Math.floor(time / 360000);

  return (
    <>
      <div className="wrapper">
        <div>
          <p>Hours</p>
          <p>{hours}</p>
        </div>
        <div>
          <p>Minutes</p>
          <p>{minutes.toString().padStart(2, "0")}</p>
        </div>
        <div>
          <p>Seconds</p>
          <p>{seconds.toString().padStart(2, "0")}</p>
        </div>
        <div>
          <p>Milli-Seconds</p>
          <p>{milliSeconds.toString().padStart(2, "0")}</p>
        </div>
      </div>
      <div className="btn-grp">
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleReset} disabled={time === 0}>
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
