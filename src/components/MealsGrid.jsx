import { useEffect } from "react";
import { getMeals } from "../http";
import { useState } from "react";
import MealItem from "./MealItem";

const MealsGrid = () => {
  const [allMeals, setAllMeals] = useState([]);

  useEffect(
    () => {
      const fetchMeals = async () => {
        try {
          const Meals = await getMeals();
          setAllMeals(Meals);
          console.log(Meals);
        } catch (error) {
          console.error(error?.message || "An error occurred retreiving meals.");
        }
      };
      fetchMeals();
    },
    []
  );

  return (
    <div id="meals">
      {
        allMeals.map(
          (item) => (
            <MealItem key={item.id} item={item} />
          )
        )
      }
    </div>
  );
};

export default MealsGrid;