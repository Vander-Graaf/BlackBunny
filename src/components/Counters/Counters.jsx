import S from "./Counters.module.css";
import { useState, useEffect } from "react";

function Counters({ product, onChange }) {
  const [count, setCount] = useState(1);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(product._id, newCount);
  };

  const decrement = () => {
    const newCount = count > 1 ? count - 1 : 1;
    setCount(newCount);
    onChange(product._id, newCount);
  };

  useEffect(() => {
    onChange(product._id, count);
  }, []);

  return (
    <div className="align-count">
      <button className="decrease-count" onClick={decrement}>
        <h1 className="count-font">-</h1>
      </button>
      <div className="count">{count}</div>
      <button className="increase-count" onClick={increment}>
        <h1 className="count-font">+</h1>
      </button>
    </div>
  );
}

export default Counters;
