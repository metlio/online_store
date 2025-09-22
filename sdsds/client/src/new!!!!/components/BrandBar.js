import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Image from "react-bootstrap/Image";
import {Form} from "react-bootstrap";
import styles from './BrandBar.module.css';
import Fade from 'react-reveal'

const BrandBar = observer(() => {

    const {device} = useContext(Context)

    return (
        <div style={{backgroundColor:'#fff'}}>   
        <Fade bottom> 
        <Form className={styles.form}>
        
        <div style={{display:'flex'}}>
            {device.brands.map(brand =>
                <div
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    className={styles.card}
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'dark' : 'light'}
                >
                    <div className={styles.ico}><div><Image width={40} height={40} src={process.env.REACT_APP_API_URL + brand.img}></Image></div></div><br></br>
                </div>
            )}
            </div>
        </Form>
        </Fade>
        </div>

    );
});

export default BrandBar;