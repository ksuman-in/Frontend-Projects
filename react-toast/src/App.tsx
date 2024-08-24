import { useState } from "react";
import "./App.css";
import Expire from "./hooks/Expire";

interface toastItem {
  title: string;
  id: number | string;
  expire: number;
}

function App() {
  const [toastData, setToastData] = useState<toastItem[]>([]);
  const id = Date.now();
  const handleToastAdd = () => {
    setToastData((prevState: toastItem[]) => {
      return [...prevState, { title: "Toast Content", id, expire: 5000 }];
    });
  };

  const handleRemoveToast = (id: string | number) => {
    setToastData((prevState: toastItem[]) => {
      prevState = prevState.filter((ele: toastItem) => ele.id !== id);
      return prevState;
    });
  };
  return (
    <div>
      <button onClick={handleToastAdd}>React Toast</button>
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        {toastData?.map((element: toastItem) => {
          const { title, id, expire } = element;
          return (
            <Expire
              delay={expire}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                color: "#000",
                padding: "10px",
                columnGap: "10px",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              {title} {id}
              <button
                onClick={() => handleRemoveToast(id)}
                style={{
                  backgroundColor: "transparent",
                  color: "#000",
                }}
              >
                X
              </button>
            </Expire>
          );
        })}
      </div>
    </div>
  );
}

export default App;
