import './button.css';

export const Button = (props) => {
  const { imageSrc, description, text, type, onClick } = props;
  return (
    <button className='btn' type={type} onClick={onClick}>
      {text}
      {imageSrc && <img src={imageSrc} alt={description}></img>}
    </button>
  );
};
