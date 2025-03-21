import { memo } from "react";
import AddButton from "./AddButton";

const MealItem = memo(({ id, name, description, price, image }) => {


  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <h3>{name}</h3>
        <div>
          <span className="meal-item-price">${price}</span>
        </div>
        <p className="meal-item-description">{description}</p>
        <div className="meal-item-actions">
          <AddButton id={id} />
        </div>
      </article>
    </div>
  );
});

export default MealItem;