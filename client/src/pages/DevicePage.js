import { getImageUrl } from '../utils/getImageUrl';
import React, {useEffect, useState, useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI"
import MealItemForm from '../components/Meals/MealItem/MealItemForm';
import CartContext from '../store/cart-context';

const DevicePage = () => {

    const [device, setDevice] = useState({info: []})
    const {id} = useParams()

    const crtContext = useContext(CartContext);
    console.log(device.img)
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

    useEffect(() => {

        fetchOneDevice(id).then(data => setDevice(data))

    }, [])

    return (         
        <div style={{minHeight:'100vh', justifyContent:'flex-end',alignItems:'start', paddingTop:'1.2rem', backgroundColor:'white'}}>
            <div style={{display:'flex', justifyContent:'flex-start', marginLeft:'1.2rem'}}>
        <h4>{device.name}</h4>
        </div>
        
        <Container className="mt-3">
            <div style={{display:'flex', maxHeight:'500px'}}>

                    <Image width={400} src={getImageUrl(device.img)}/>
                    <Image width={400} src={getImageUrl(device.imgg)}/>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{backgroundColor:'#000', border: '0px solid lightgray'}}
                    >
                    <div
                    className="d-flex align-items-center justify-content-center"
                    style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:32}}
                    >
                    {device.rating}
                    </div>
                        <h2>От {device.price} руб.</h2>
                        <div>
                        <MealItemForm onAddToCart={addToCartHandler} id={device.id}/>
                        </div>
                    </Card>
            </div>
            <div>
                <h2>Характеристики</h2>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? '#eee' : 'transparent', padding: 10}}>
                        {info.title}:{info.description}
                    </Row>
                )}
            </div>
        </Container>
        </div>
    );
};

export default DevicePage;