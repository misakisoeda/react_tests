import { useState } from 'react';

function ClickButtons() {
  const [lastClicked, setLastClicked] = useState('なし');

  const handleClick = (buttonName: string) => {
    alert(`${buttonName}がクリックされました！`);
    setLastClicked(buttonName);
  }

  return (
    <div>
      <h3>最後にクリックしたボタン: {lastClicked}</h3>
      <button onClick={() => handleClick('ボタン1')}>ボタン1</button>
      <button onClick={() => handleClick('ボタン2')}>ボタン2</button>
      <button onClick={() => handleClick('ボタン3')}>ボタン3</button>
    </div>
  );
}

export default ClickButtons;
