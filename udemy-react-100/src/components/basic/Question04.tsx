function StyledBox() {
  const boxStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    border: '2px solid #333',
    borderRadius: '8px'
  };

  return (
    <div>
      <div style={boxStyle}>
        インラインスタイルのボックス
      </div>
      <div className="custom-box">
        CSSクラスのボックス
      </div>
    </div>
  );
}

export default StyledBox;
