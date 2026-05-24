import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1); //連打防止で関数形式で書く
    // setCount(count + 1);
  }

  const decrement = () => {
    setCount(prev => prev - 1);
    // setCount(count - 1);
  }

  const reset = () => {
    setCount(0);
  }

  return (
    <div>
      <h2>カウンター: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>リセット</button>
    </div>
  );
}

export default Counter;
