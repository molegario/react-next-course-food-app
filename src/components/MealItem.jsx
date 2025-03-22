import { memo } from "react";
import AddButton from "./AddButton";
import { priceFormatter } from "../utils/formatter";

const MealItem = memo(({ id, name, description, price, image }) => {


  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <span className="meal-item-price">{priceFormatter(price)}</span>
          <p className="meal-item-description">
            <span>{description}</span>
          </p>
        </div>
        <p className="meal-item-actions">
          <AddButton id={id} />
        </p>
      </article>
    </li>
  );
});

export default MealItem;