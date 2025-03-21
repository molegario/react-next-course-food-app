const MealItem = ({
  item: {
    id,
    name,
    description,
    price,
    image,
  },
}) => {

  const addToCartHandler = () => {
    return () => {
      console.log('Add to Cart ' + id);
    };
  };

  return (
    <div className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${image}`}
          alt={name}
        />
        <h3>{name}</h3>
        <div>
          <span className="meal-item-price">${price}</span>
        </div>
        <p className="meal-item-description">
          {description}
        </p>
        <div className="meal-item-actions">
          <button className="button" onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </article>
    </div>
  );
};

export default MealItem;