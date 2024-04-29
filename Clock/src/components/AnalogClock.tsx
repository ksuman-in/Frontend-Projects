import { Box, Card, CardContent, CardHeader } from "@mui/material";
import "./AnalogClock.scss";
import { useEffect, useState } from "react";
import { getTime } from "../healper";

const AnalogClock = () => {
  const [date, setDate] = useState(getTime());
  useEffect(() => {
    const timer = setInterval(() => setDate(getTime()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const hours = date.hours * 30 + date.minutes / 2;
  const minutes = date.minutes * 6;
  const seconds = date.seconds * 6;
  const stylesHours = {
    transform: `rotateZ(${hours}deg)`,
  };
  const stylesMinutes = {
    transform: `rotateZ(${minutes}deg)`,
  };
  const stylesSeconds = {
    transform: `rotateZ(${seconds}deg)`,
  };
  return (
    <Box>
      <Card variant="outlined" className="analog">
        <CardHeader
          title="Analog Clock"
          subheader={`${date.month}, ${date.year}`}
        />
        <CardContent className="analog-container">
          <div className="analog-clock dot">
            <p className="analog-clock-day">{date.days}</p>
            <div className="hours-container">
              <div className="hours" style={stylesHours}></div>
            </div>
            <div className="minutes-container">
              <div className="minutes" style={stylesMinutes}></div>
            </div>
            <div className="seconds-container">
              <div className="seconds" style={stylesSeconds}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalogClock;
