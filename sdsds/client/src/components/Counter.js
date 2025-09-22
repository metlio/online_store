import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';


const Counter = () => {
    const dispatchFunction = useDispatch();
    const counter = useSelector((state) => state.counter);

    const incrementHandler = () => {
        dispatchFunction({type:'increment'})
    }

    const decrementHandler = () => {
        dispatchFunction({type:'decrement'})
    }

    const increaseHandler = () => {
        dispatchFunction({type: 'increase', number: 10})
    }

    const toggleCounterHandler = () => {};

    return (
        <main className={classes.counter}>
            <h1>Счетчик</h1>
            <div className={classes.value}>
                {counter}
            </div>
            <div>
                <button onClick={incrementHandler}>+</button>
                <button onClick={increaseHandler}>+10</button>
                <button onClick={decrementHandler}>-</button>
            </div>
            <button onClick={toggleCounterHandler}>Спрятать / Показать</button>
        </main>
    )
}

export default Counter;