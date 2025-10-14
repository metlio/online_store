import React, {useContext, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import {Context} from "../index";
import Shetchik from '../components/Shetchik'
import styles from './Tvorog.css';
import Edit from '../components/Edit';



function Quiz() {

    const {brand} = useContext(Context)

    const [visible, setVisible] = useState(false)

    const handleOver = () => {

        setVisible((currentValue) => !currentValue)
    }

    return (
        <div>
            <div style={{ display: 'flex',backgroundColor:'#fff'}}>
                <div style={{width:'20%', minHeight:'100vh'}}>
            </div>
            <div style={{width:'80%', minHeight:'100vh', justifyContent:'center'}}>
            <h2 className={styles.conta}>My chosen works 2023</h2>
            <Edit />
            <Button variant='primary' onMouseOver={handleOver}>
                Показать
            </Button>
            {visible &&
            <Card>
                <Card.Body>Это ява библиотека<Shetchik /></Card.Body>
            </Card>}
            </div>
            </div>
        </div>
    );
  }

  export default Quiz;