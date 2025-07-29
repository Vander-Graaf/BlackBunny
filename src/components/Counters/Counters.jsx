import S from "./Counters.module.css";
import { useState, useEffect } from "react";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";

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
    <div className={S.align}>
      <button className={S.decrease_counter} onClick={decrement}>
        <img src={minus} alt={minus} />
      </button>
      <div className={S.counter}>{count}</div>
      <button className={S.increase_counter} onClick={increment}>
        <img src={plus} alt={plus} />
      </button>
    </div>
  );
}

export default Counters;
