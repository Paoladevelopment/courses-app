import './button.css';

export const Button = (props) => {
  const { text, type, onClick } = props;
  return (
    <button className='btn' type={type} onClick={onClick}>
      {text}
    </button>
  );
};
