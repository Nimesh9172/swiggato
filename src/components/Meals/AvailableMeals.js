import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

// {
//   id: 1,
//   price: 123,
//   description: "dfgd",
//   name: "name",
// }
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError,setHttpError] = useState(null)

  const sendRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://react-http-925d0-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          price: data[key].price,
          description: data[key].description,
          name: data[key].name,
        });
      }

      setMeals(transformedData);
    } catch (err) {
      // console.log(err);
      setHttpError(err.message)
    }
    setIsLoading(false);
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <ul>{mealsList}</ul>;

  if (mealsList.length === 0) {
    content = <p>No Meals Available.</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (httpError){
    content = <p>{httpError}</p>
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
