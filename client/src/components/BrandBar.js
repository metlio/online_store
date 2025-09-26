import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Image from "react-bootstrap/Image";
import {Form} from "react-bootstrap";
import styles from './BrandBar.module.css';
import Fade from 'react-reveal/Fade';


const BrandBar = observer(() => {

    const {device} = useContext(Context)

    return (
        <div style={{backgroundColor:'#fff'}}>   
        <Fade> 
        <Form className={styles.form}>
        
        <div style={{display:'flex', justifyContent:'center',flexWrap:'wrap', alignItems:'center'}}>
            {device.brands.map(brand =>
                <div
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    className={styles.card}
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'dark' : 'light'}
                >
                    <div className={styles.ico}><div><Image width={40}src={process.env.REACT_APP_API_URL + '/static/' + brand.img}></Image></div></div><br></br>
                </div>
            )}
            </div>
        </Form>
        </Fade>
        </div>

    );
});

export default BrandBar;