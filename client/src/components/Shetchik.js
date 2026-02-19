import React from 'react';
import { useState, useEffect } from 'react';

function Shetchik() {
    const [count, setCount] = useState(10);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([{text: 'тестовая задача'}]);

    const onClickAdd = () => {

        const text = prompt('Текст задачи');
        
        setTasks([...tasks, { text }]);

    }

        const onClickEdit = (index) => {

            const text = prompt('Текст задачи');

            setTasks(tasks.map((obj, i) => {
                if (index===i) {
                
                 //   obj.text = text;

                
                return {
                    ...obj,
                    text: text,
                };
            }
                return obj;
                
            }))
        };
        const onClickRemove = (index) => {

            setTasks(tasks.filter(( _ , i) => i !== index));
        };


    useEffect(() => {

        setInterval(() => {
            setCount((prev) => prev - 1);
        
        }, 1000);


        const fetchMeals = async () => {

            const response = await fetch(
                (process.env.REACT_APP_API_URL || 'http://localhost:5000/') + "api/device"
              );
              
              if(!response.ok) {
                throw new Error("Что-то не так")
              }
    
              const xata = await response.json();
              const data = xata.rows
              const loadedMeals =[];
              for (const key in data){
                loadedMeals.push({
                  id: key,
                  pid: data[key].id,
                  name: data[key].name,
                  rating: 5,
                })
              }
    
              setUsers(loadedMeals);
            };
    
            fetchMeals().catch((err) => {
              console.log("ОШИБКА!!!!!!!!!")
            
            });    




        
    }, []);

    if (!users) {
        return (
            <div>Loading...</div>
        )

    }

    return (
        <div>
            <ul>
                {users.map((obj) => (
                    <li key={obj.id}>{obj.name}{obj.rating}</li>
                ))}
            </ul>
            <h1>{count}</h1>
            <ul>
                {tasks.map((task, i) => (
                    <li key={i}>
                        {task.text}
                        <button onClick={() => onClickEdit(i)}>Edit</button>
                        <button onClick={() => onClickRemove(i)}>X</button>
                    </li>
                ))}
                <button onClick={onClickAdd}>Добавить</button>
            </ul>
        </div>
    )

}

export default Shetchik;