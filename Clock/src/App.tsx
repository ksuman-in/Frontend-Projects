import { useContext } from "react";
import "./App.scss";
import DigitalClock from "./components/DigitalClock";
import { ClockContext } from "./ClockProvider";
import AnalogClock from "./components/AnalogClock";
import { Switch } from "@mui/material";

function App() {
  const { isDigitalClock, handleClock } = useContext(ClockContext);
  console.log({ isDigitalClock });
  return (
    <>
      <div>
        <p>{isDigitalClock ? "Digital" : "Analog"} Clock</p>
        <Switch onChange={handleClock} />
      </div>
      {isDigitalClock ? <DigitalClock /> : <AnalogClock />}
    </>
  );
}

export default App;
