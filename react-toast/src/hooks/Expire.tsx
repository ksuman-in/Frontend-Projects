import { useEffect, useState } from "react";

const Expire = ({
  delay,
  children,
  style,
}: {
  delay: number;
  children: React.ReactNode;
  style: any;
}) => {
  const maxValue = delay / 1000;
  const [visible, setVisible] = useState<boolean>(true);
  const [value, setValue] = useState<number>(maxValue + 1);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (value) {
      setTimeout(() => {
        setValue((prevState) => prevState - 1);
      }, 1000);
    }
  }, [value]);

  return visible ? (
    <div style={style}>
      {children}
      <progress
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "5px",
          width: "100%",
          padding: 0,
          borderRadius: 0,
        }}
        id="progress-bar"
        value={value}
        max={maxValue}
      ></progress>
    </div>
  ) : (
    ""
  );
};

export default Expire;
