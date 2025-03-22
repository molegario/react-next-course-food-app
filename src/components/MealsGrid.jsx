import { memo, useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const MealsGrid = memo(() => {
  const {
    data: allMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", undefined, []);

  return (
    <>
      {isLoading && <p className="loading-status">Loading menu...</p>}
      {allMeals.length === 0 && !isLoading && !error && (
        <p className="empty-status">
          No meals found. Please check back later.
        </p>
      )}
      {error && <p className="error-status">{`service error: ${error}`}</p>}
      <ul id="meals">
        {allMeals.map((item) => (
          <MealItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
});

export default MealsGrid;