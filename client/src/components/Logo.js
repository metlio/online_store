import React, {useContext} from 'react';
import { ReactComponent as Logotyp } from "./sv.svg";
import styles from './Logo.module.css'
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import Tilt from 'react-parallax-tilt';
import { Fade } from 'react-reveal';
import {Context} from "../index";

function Logo() {


  const {device} = useContext(Context)




    return (

      <div style={{display:'flex',height:'5rem', alignItems:'center'}}>
          <div style={{width:'50px'}}>
            <NavLink style={{color:'black'}} to={SHOP_ROUTE} activeclassname={styles.active}>
            <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.15}>
              <Fade out>
              <Logotyp onClick={() => {device.setSelectedType(0)}}/>
              </Fade>
              </Tilt>
              </NavLink>
            </div>
          </div>  
    )
}

    export default Logo;
