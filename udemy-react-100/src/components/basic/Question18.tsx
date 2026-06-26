import { useState } from 'react';

function MouseEvents() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [boxPos, setBoxPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // ホバー
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // マウス座標
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    if (isDragging) {
      const maxX = rect.width - 100; // ボックスの幅を考慮(ハードコーディングで)
      const maxY = rect.height - 100; // ボックスの高さを考慮(ハードコーディングで)

      const newX = e.clientX - rect.left - dragStart.x;
      const newY = e.clientY - rect.top - dragStart.y;

      const newBoxPos = {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      }

      setBoxPos(newBoxPos);
    }
  }

  // ドラッグ
  // 開始
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - parentRect.left - boxPos.x,
      y: e.clientY - parentRect.top - boxPos.y,
    });
  }
  // 終了
  const handleMouseUp = () => {
    setIsDragging(false);
  }
  const handleContainerLeave = () => {
    setBoxPos({ x: 50, y: 50 });
  }

  return (
    <>
      {/* コンテナ */}
      <div
        style={{
          height: '400px',
          width: '400px',
          position: 'relative',
          border: '1px solid #ccc',
          overflow: "hidden"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleContainerLeave}
      >
        {/* ボックス */}
        <div
          style={{
            position: 'absolute',
            left: boxPos.x,
            top: boxPos.y,
            width: '100px',
            height: '100px',
            backgroundColor: isHovered ? 'lightblue' : 'gray',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            transition: isDragging ? 'none' : 'all 0.3s'
          }}
          // マウスイベントを設定
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          ドラッグ可能
        </div>
        <p>マウス座標: X={mousePos.x}, Y={mousePos.y}</p>
      </div>
    </>
  );
}

export default MouseEvents;
