import { useState } from 'react';

type Position = {
  x: number;
  y: number;
};

function EventInfo() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [bgColor, setBgColor] = useState('white');
  const [counter, setCounter] = useState(0);

  // クリック処理
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });

    setCounter(prev => prev + 1);

    if(e.shiftKey) {
      setBgColor(bgColor === 'white' ? 'lightblue' : 'white');
    }
  };

  // 右クリック処理
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    alert('右クリックは無効化されています');
  };

  // ダブルクリック処理
  const handleDoubleClick = () => {
    setCounter(0);
  };

  return (
    <div
      style={{
        height: '300px',
        backgroundColor: bgColor,
        position: 'relative',
        border: '1px solid #ccc'
      }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onDoubleClick={handleDoubleClick}
    >
      <p>クリック位置: X={position.x}, Y={position.y}</p>
      <p>カウンター: {counter}</p>
      <p>Shiftキーを押しながらクリックで色が変わります</p>
    </div>
  );
}

export default EventInfo;
