import { useState } from 'react';

function ToggleSwitch() {
  // ON/OFF状態を管理
  const [isOn, setIsOn] = useState(false);

  const buttonStyle = {
    backgroundColor: isOn ? 'green' : 'red',
  };

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div>
      <button
        style={buttonStyle}
        onClick={toggleSwitch}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
      <p>現在の状態: {isOn ? 'アクティブ' : '非アクティブ'}</p>
    </div>
  );
}

export default ToggleSwitch;
