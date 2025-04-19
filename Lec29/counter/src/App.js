import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("MOUNT STAGE: First Render");
  }, []);
  useEffect(() => {
    console.log("UPDATE STAGE: Re-Render");
  }, [count]);
  useEffect(() => {
    console.log("UNMOUNT STAGE: Final Render");
    return () => {};
  }, []);

  return (
    <div>
      <p>Life Cycle Methods</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click here to increase {count}
      </button>
    </div>
  );
}

export default App;
