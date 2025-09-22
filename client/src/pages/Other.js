import React, {useEffect, useState} from 'react';
import  PaintIcon from "../components/logo.png";
import  CartIcon from "../components/cart.png";

const Other = () => {

  const [ width, setWidth ] = useState(0);

    let mojno="relative";
    let trip="";
    let goe='0';
  if (width<=100) {
    trip="#c5c5c5"
}
    if (width>100) {
      mojno="fixed"
      trip="#cce1e1"
      goe='0'
    }


    useEffect(() => {
        setInterval(() => {
        setWidth((prev) => window.scrollY/10);
    }, 1);
    }, setWidth);

    console.log(mojno)

    return <div style={{backgroundImage:`<CartIcon/>`}}><div style={{position:mojno, zIndex:'99', transition: "all 1s ease-out", top:goe, margin:'',width:'100vw', height:"200vh", backgroundColor:trip, borderRadius:'20px'}}><div style={{display:'flex', justifyContent:'space-between'}}><img src={PaintIcon} alt="My Image" /><img src={CartIcon} alt="My Image" /></div><div style={{perspective:'50px', height: '80%', fontSize:'72pt',display:'flex', justifyContent:"center", alignItems:'center'}}>Hello there!</div></div>  <div>
    

  </div></div>

};
 export default Other
