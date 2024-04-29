import { useEffect, useState } from "react";
import { getTime } from "../healper";
import { Box, Card, CardContent, CardHeader } from "@mui/material";

const DigitalClock = () => {
  const [date, setDate] = useState(getTime());
  useEffect(() => {
    const timer = setInterval(() => setDate(getTime()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box>
      <Card variant="outlined">
        <CardHeader
          title="Digital Clock"
          subheader={`${date.month}, ${date.year}`}
        />
        <CardContent>
          <div className="clock-container">
            <div className="days-year">
              <p className="clock-day">{date.days}</p>
            </div>
            <div className="time">
              <div className="clock-col">
                <p className="clock-hours clock-timer">
                  {date.hours}
                  <sup className="sup-periods">{date.periods}</sup>
                </p>
                <p className="clock-label">Hours </p>
              </div>
              <div className="clock-col">
                <p className="clock-minutes clock-timer">{date.minutes}</p>
                <p className="clock-label">Minutes</p>
              </div>
              <div className="clock-col">
                <p className="clock-seconds clock-timer">{date.seconds}</p>
                <p className="clock-label">Seconds</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DigitalClock;
