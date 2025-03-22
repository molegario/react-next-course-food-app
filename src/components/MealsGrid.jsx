import { useContext, useEffect } from "react";
import { getMeals } from "../utils/http";
import { useState } from "react";
import MealItem from "./MealItem";
import { CartContext } from "../store/cart-context";

const MealsGrid = () => {
  const [allMeals, setAllMeals] = useState([]);
  const { setMenuPrices } = useContext(CartContext);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const Meals = await getMeals();
        setAllMeals(Meals);
        setMenuPrices(
          Meals.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
          }))
        );
        console.log(Meals);
      } catch (error) {
        console.error(error?.message || "An error occurred retreiving meals.");
      }
    };
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {allMeals.map((item) => (
        <MealItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default MealsGrid;
