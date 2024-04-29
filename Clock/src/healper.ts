export const getTime = () => {
  const date = new Date();
  const days = date.toLocaleString("default", { weekday: "long" });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const month = date.toLocaleString("default", { month: "long" });

  let periods = "AM";

  if (hours > 12) {
    hours = hours - 12;
    periods = "PM";
  }

  return {
    hours,
    seconds,
    minutes,
    days,
    year,
    periods,
    month,
  };
};
