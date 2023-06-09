import './input.css';
export const Input = (props) => {
  const {
    labelText,
    id,
    placeholder,
    value,
    type,
    onChange,
    register,
    validators,
  } = props;
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        {...(register && register(id, validators))}
        className='app-input'
      />
    </>
  );
};
