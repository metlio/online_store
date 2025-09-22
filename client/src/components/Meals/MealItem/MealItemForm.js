import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
import Increment from "../../Increment";

const MealItemForm = (props) => {

    const [isAmountValid, setIsAmountValid] = useState(true);
    const [value, setValue] = useState(1);


    const submitHandler = (event) => {

        event.preventDefault();
        
        const inputAmount = value;
        
        if (inputAmount.length ===0 || +inputAmount < 1 || +inputAmount > 10) {
            setIsAmountValid(false);
            return;
        } else {
            setIsAmountValid(true);
        }

        props.onAddToCart(+inputAmount);
    }
    return (
        <form className={styles.form} onSubmit={submitHandler}>
                        {/* <Input

                label=""
                input={{
                    id:props.id,
                    type: 'number',
                    min: '1',
                    step: '1',
                    defaultValue: '1',
                }}
            /> */}
                        {/* <Increment value={value} changed={setValue} /> */}
                        <button>Купить</button>

             {!isAmountValid && <p style={{color:'white', fontSize:'0.5rem', marginBottom:'0', marginLeft:'7px'}}>Введите кол-во <br></br>от 1 до 10</p>}

            
           
        </form>     
    )
}

export default MealItemForm;