import styles from './MealList.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';
//import {observer} from "mobx-react-lite";

//const INITIAL_MEALS = []

  
const MealList = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpErrorMessage, setHttpErrorMessage] = useState(false);

    useEffect(() => {

      const fetchMeals = async () => {

        setIsLoading(true);

        const response = await fetch(
            (process.env.REACT_APP_API_URL || 'http://localhost:5000/') + "api/device"
          );
          
          if(!response.ok) {
            throw new Error("Что-то не так")
          }

          const xata = await response.json();
          const data = xata.rows
          console.log(data)
          const loadedMeals =[];
      
          for (const key in data){
            loadedMeals.push({
              id: key,
              pid: data[key].id,
              name: data[key].name,
              img: data[key].img,
              price: data[key].price
            })
          }

          setMeals(loadedMeals);
          setIsLoading(false);
        };

        fetchMeals().catch((err) => {
          setIsLoading(false);
          setHttpErrorMessage(err.message);
        
        });
        


    }, []);

    if(isLoading){
      return (<section className={styles.loading}>
        <p>Извлекаем</p>
      </section>
      );
    }

    if (httpErrorMessage) {
      return <section className={styles.error}>
      <p>{httpErrorMessage}</p>
    </section>
    }

    const mealList = meals.map((meal) => <MealItem key={meal.id} id={meal.id} pid={meal.pid} name={meal.name} price={meal.price} ima={meal.img}/>)

    return <section className={styles.meals}>
        
        <Card>    
            <ul>
                {mealList}
            </ul>
        </Card>    
    </section>

}

export default MealList;
