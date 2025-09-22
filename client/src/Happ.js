import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
//import Meals from "./components/Meals/Meals";
//import CartContextProvider from "./store/CartContextProvider";
//import { Courusel } from "./components/Courusel/Courusel";
import { Card } from "react-bootstrap";

function Happ() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <Card style={{border:'0'}}>
      {cartIsVisible && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
    </Card>
  );
}

export default Happ;