const Input = ({
  labelText,
  id,
  ...rest
}) => {
  return (
    <p className="control">
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        {...rest}
        required
      />
    </p>
  );
};

export default Input;