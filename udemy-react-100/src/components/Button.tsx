type ButtonProps = {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
};

const defaultProps: Required<ButtonProps> = {
  text: 'Click Me',
  size: 'medium',
  color: 'blue'
};

function Button(props: ButtonProps) {
  const { text, size, color } = { ...defaultProps, ...props };

  const buttonStyle = {
    padding: size === 'small' ? '5px 10px' :
            size === 'large' ? '15px 30px' : '10px 20px',
    backgroundColor: color,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <button style={buttonStyle}>
      {text}
    </button>
  );
}

export default Button;
