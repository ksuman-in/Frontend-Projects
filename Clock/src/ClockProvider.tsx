import { ReactNode, createContext, useState } from "react";

const clock = { isDigitalClock: true };

type ProviderTypes = {
  handleClock?: () => void;
  isDigitalClock: boolean;
};

export const ClockContext = createContext<ProviderTypes>(clock);

export const ClockProvider = ({ children }: { children: ReactNode }) => {
  const [isDigitalClock, setDigitalclock] = useState(true);
  const handleClock = () => {
    setDigitalclock((prev) => !prev);
  };
  return (
    <ClockContext.Provider value={{ isDigitalClock, handleClock }}>
      {children}
    </ClockContext.Provider>
  );
};
