import {React, useContext, useState, useEffect} from 'react'
import Image from "react-bootstrap/Image"
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts"
import {observer} from "mobx-react-lite";
import MealItemForm from './Meals/MealItem/MealItemForm'
import CartContext from '../store/cart-context';
//import Tilt from 'react-parallax-tilt';
import styles from './DeviceItem.module.css'
import CreateRating from "../components/modals/CreateRating";
import { ReactComponent as Logo2 } from '../assets/star_all.svg';
import Fade from 'react-reveal/Fade';
import NewComponent from './NewComponent';
import Tilt from 'react-parallax-tilt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeviceItem = observer(({device}) => {

    const [ratingVisible, setRatingVisible] = useState(false)
    const [imaging, setImaging] = useState(false)

    const apiUrl = process.env.REACT_APP_API_URL || '';
    const sold2 = apiUrl + '/static/' + device.imgg;
    const sold = apiUrl + '/static/' + device.img;

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
    toast.success(`${device.name} added to cart!`);
}
    const navigate = useNavigate()
    
    return (
        <div className={styles.deviceCard}>
            <ToastContainer />
            <div
                className={styles.imageContainer}
                onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
                onMouseEnter={() => setImaging(true)}
                onMouseLeave={() => setImaging(false)}
            >
                <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} gyroscope={true} glareEnable={true} glareReverse={true} glareMaxOpacity={0.5} scale={1}>
                    <Fade out>
                        <Image height='250px' src={imaging ? sold2 : sold} />
                    </Fade>
                </Tilt>
            </div>
            <div className={`${styles.deviceInfo} text-white-50 d-flex justify-content-between align-items-center`}>
                <NewComponent homa={device.brandId} />
                <div>{device.specs}</div>
                <div className={styles.ratingContainer}>
                    <Logo2 width={18} />
                    <div className={styles.ratingText} onClick={() => setRatingVisible(true)}>
                        {device.rating}
                    </div>
                </div>
            </div>
            <div className={styles.deviceName}>{device.name}</div>
            <div className={styles.priceContainer}>
                <div className={styles.currentPrice}>
                    {formattedPrice}
                    <div className={styles.currencySymbol}>₽</div>
                </div>
                <div className={styles.oldPrice}>
                    {oldPrice}
                    <div className={styles.oldPriceCurrencySymbol}>₽</div>
                </div>
                <div>
                    <MealItemForm onAddToCart={addToCartHandler} id={device.id} />
                </div>
            </div>
        </div>
    );


    });

export default DeviceItem;
