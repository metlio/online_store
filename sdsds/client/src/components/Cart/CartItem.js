import Image from "react-bootstrap/Image"
import classes from "./CartItem.module.css";
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../../utils/consts"

const CartItem = (props) => {
  const price = `₽${props.price.toFixed(2)}`;
  const navigate = useNavigate()
  return (
    <li className={classes["cart-item"]}>
      <div style={{display:'flex', alignItems:'center'}}>
      <Image style={{cursor:'pointer'}} onClick={() => navigate(DEVICE_ROUTE + '/' + props.id)} width={50} height={50} src={process.env.REACT_APP_API_URL + props.image}/>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;