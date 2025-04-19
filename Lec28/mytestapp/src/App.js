import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  // let count = 0;
  //take count variable as state
  const [count, setCount] = useState(0);
  function incrementCount() {
    setCount(count + 1); //count = count + 1
    console.log(count);
  }
  function decrementCount() {
    setCount(count - 1);
    //count -= 1;
    console.log(count);
  }
  return (
    <>
      <p>{count}</p>
      <button onClick={incrementCount}>+</button>
      <button onClick={decrementCount}>-</button>
    </>
  );
}

export default App;
