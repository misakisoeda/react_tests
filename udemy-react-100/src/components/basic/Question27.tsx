import { useState } from 'react';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const containerStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
    minHeight: '200px',
    padding: '20px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <h2>
        {isDarkMode ? 'ダークモードだよ' : 'ライトモードだよ'}
      </h2>

      <p>
        現在のテーマ: {isDarkMode ? 'ダーク' : 'ライト'}
      </p>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          backgroundColor: isDarkMode ? '#ffffff' : '#1a1a1a',
          color: isDarkMode ? '#1a1a1a' : '#ffffff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
        }}
      >
        {isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      </button>
    </div>
  );
}

export default ThemeToggle;
