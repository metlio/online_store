import { useContext } from 'react';
import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';
import Image from "react-bootstrap/Image"
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../../../utils/consts"
import { getImageUrl } from '../../../utils/getImageUrl';

const MealItem = (props) => {

    const navigate = useNavigate()

    const crtContext = useContext(CartContext);

    const formattedPrice = `$${props.price.toFixed(2)}`;

    const addToCartHandler = (amount) => {
        crtContext.addItem({
            id: props.id,
            pid: props.pid,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    }

    return <li className={styles.meal}>
        <div>
            <h3 onClick={() => navigate(DEVICE_ROUTE + '/' + props.pid)}>{props.name}</h3>
            <div className={styles.name}>{props.name}</div>
            <div><Image width={100} height={100} src={getImageUrl(props.ima)}/></div>
            <div className={styles.price}>{formattedPrice}</div>
            
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler} id={props.id}/>
        </div>
    </li>
}

export default MealItem;