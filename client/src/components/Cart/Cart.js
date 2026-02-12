import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import SubmitOrder from './SubmitOrder';
import {$authHost} from "../../http/index";

const Cart = (props) => {

    const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false);

    const cartContext = useContext(CartContext);
    
    const totalAmount = `₽${Math.abs(cartContext.totalAmount).toFixed(2)}`;

    const hasItems = cartContext.items.length > 0;


    const removeCartItemHandler = (id) => {
        cartContext.removeItem(id);
    }

    const addCartItemHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 });
    }

    const orderHandler = () => {
      setIsSubmitOrderAvailable(true);
    }

    // const submitOrderHandler = (userData) => {
    //   fetch('http://localhost:5000/api/device',{
    //     method: 'POST',
    //     body: JSON.stringify({
    //       user: userData,
    //       orderedMeals: cartContext.items,
    //     })
    //   })
    // };

    const submitOrderHandler = async (brand) => {
      const {data} = await $authHost.post('/api/brand', brand)
      return data
    }

    const cartItems = (
        <ul className={styles["cart-items"]}>
          {cartContext.items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.img}
              amount={item.amount}
              price={item.price}
              onAdd={addCartItemHandler.bind(null, item)}
              onRemove={removeCartItemHandler.bind(null, item.id)}
            />
          ))}
        </ul>
      );

    const modalButtons = (
      <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.onHideCart}>Закрыть</button>
      {hasItems && <button className={styles.button} onClick={orderHandler}>Заказ</button>}
  </div>
    ) ;
    return (
    <Modal onHideCart={props.onHideCart}>

        {hasItems ? cartItems : <div style={{paddingTop:'10px'}}>Ваша корзина пуста</div>}
        <div className={styles.total}>
            <span>Итого</span>
            <span>{totalAmount}</span>
        </div>

        {isSubmitOrderAvailable && <SubmitOrder onSubmit={submitOrderHandler} onCancel={props.onHideCart}/>}
        {!isSubmitOrderAvailable && modalButtons}

    </Modal>
    )

}

export default Cart;