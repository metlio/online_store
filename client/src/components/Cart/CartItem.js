import Image from "react-bootstrap/Image"
import classes from "./CartItem.module.css";
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../../utils/consts"

const CartItem = (props) => {
  const price = `₽${props.price.toFixed(2)}`;
  const navigate = useNavigate()
  return (
    <li className={classes["cart-item"]}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
      <Image style={{flexBasis:'80px'}} onClick={() => navigate(DEVICE_ROUTE + '/' + props.id)} width={50} src={process.env.REACT_APP_API_URL + '/static/' + props.image}/>
        <span style={{fontSize:'10px', flexBasis:'100px'}}>{props.name}</span>
        <div  style={{flexBasis:'80px'}} className={classes.summary}>
          <span className={classes.price}>{price}</span>

        </div>
      </div>
      <span style={{marginLeft: '-5rem'}} className={classes.amount}>x {props.amount}</span>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;