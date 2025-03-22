import { memo, useEffect } from "react";
import { getMeals } from "../utils/http";
import { useState } from "react";
import MealItem from "./MealItem";

const MealsGrid = memo(() => {
  const [allMeals, setAllMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const Meals = await getMeals();
        setAllMeals(Meals);
      } catch (error) {
        console.error(error?.message || "An error occurred retreiving meals.");
      }
    };
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {allMeals.map((item) => (
        <MealItem key={item.id} item={item} />
      ))}
    </ul>
  );
});

export default MealsGrid;