const Button = ({
  children,
  className,
  textOnly,
  ...rest
}) => {
  let allClasses = textOnly ? "text-button" : "button";
  allClasses += className ? ` ${className}` : ""; 

  return (
    <button
      className={allClasses}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;