import { memo } from "react";
import AddButton from "./AddButton";
import { priceFormatter } from "../utils/formatter";

const MealItem = memo(({item}) => {


  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${item.image}`} alt={item.name} />
        <div>
          <h3>{item.name}</h3>
          <span className="meal-item-price">{priceFormatter(item.price)}</span>
          <p className="meal-item-description">
            <span>{item.description}</span>
          </p>
        </div>
        <p className="meal-item-actions">
          <AddButton item={item} />
        </p>
      </article>
    </li>
  );
});

export default MealItem;