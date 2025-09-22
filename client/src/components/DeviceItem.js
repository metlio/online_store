import {React, useContext, useState, useEffect} from 'react'
import Image from "react-bootstrap/Image"
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts"
import {observer} from "mobx-react-lite";
import MealItemForm from './Meals/MealItem/MealItemForm'
import CartContext from '../store/cart-context';
import CartContextProvider from '../store/CartContextProvider'
//import Tilt from 'react-parallax-tilt';
import styles from './Item.module.css'
import CreateRating from "../components/modals/CreateRating";
import { ReactComponent as Logo2 } from '../assets/star_all.svg';
import Fade from 'react-reveal/Fade';
import NewComponent from './NewComponent';
import Tilt from 'react-parallax-tilt';

const DeviceItem = observer(({device}) => {

    const [ratingVisible, setRatingVisible] = useState(false)
    const [imaging, setImaging] = useState(false)

    const sold2 = process.env.REACT_APP_API_URL + device.imgg;
    const sold = process.env.REACT_APP_API_URL + device.img;

    const formattedPrice = `${device.price.toFixed(0)}`;
    const oldPrice = formattedPrice*1.5;

    const crtContext = useContext(CartContext);

    const city = device.brandId;
    
    const addToCartHandler = (amount) => {
        crtContext.addItem({
        id: device.id,
        img: device.img,
        pid: device.pid,
        name: device.name,
        amount: amount,
        price: device.price,
    });
}
    const navigate = useNavigate()
    
    return (
        <CartContextProvider> 
        <div className={styles.homa}>
            <div /*onClick={()=>setImaging(!imaging)} onMouseOut={()=>setImaging(false)}*/><Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} gyroscope={true} glareEnable={true} glareReverse={true} glareMaxOpacity={0.5} scale={1}><Fade out><Image style={{cursor:'pointer'}} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)} height='250px'src={ imaging ? sold2 : sold }/></Fade></Tilt>
            </div>
                <div style={{color:'#fff'}} className="text-white-50 d-flex justify-content-between align-items-center">
                <NewComponent homa={device.brandId} />
                    <div>{device.specs}</div>  
                <div style={{padding:'1%' , display:'flex', flexDirection:'column'}}> 
                    <Logo2 width={18} />  
                    <div style={{fontSize:'0.6rem', marginTop:'-5px'}} onClick={() => setRatingVisible(true)}>
                        {device.rating}
                    </div>
                </div>
                </div>
                <div style={{color:'black', display:'flex', justifyContent:'flex-start', paddingBottom:'0.4rem'}}>{device.name}</div>
                <div  className={styles.lopa} style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', height:'6vh'}}>
                <div style={{display:'flex', color:'#6b068a', fontSize:'1.5rem'}}>{formattedPrice}<div style={{color:'#6b068a', fontWeight:'600', fontSize:'1.5rem',marginLeft:'0.25rem'}}>₽</div></div>

                <div style={{display:'flex', color:'#ccc', fontSize:'1rem', textDecoration:'line-through'}}>{oldPrice}<div style={{color:'#ccc', fontWeight:'600', fontSize:'1rem'}}>₽</div></div>

                <div>
                <MealItemForm onAddToCart={addToCartHandler} id={device.id}/>
                </div>
                </div>
            </div>           
        <CreateRating person={device.id} show={ratingVisible} onHide={() => setRatingVisible(false)}/>  
        </CartContextProvider>
    );


    });

export default DeviceItem;