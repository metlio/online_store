import React, {useContext} from 'react';
import Logo from './Logo';
import styles from './Menu.module.css';
import NavBar from './NavBar';
import {useNavigate} from 'react-router-dom'
import {OTHER_ROUTE, MAGAZINE_ROUTE} from "../utils/consts";


function Menu() {
  
  const history = useNavigate()

    return (
      <div style={{ display:'flex', alignItems:'center', backgroundColor:'#e7e7e7', justifyContent:'space-between', padding:'3px',paddingRight:'10%', zIndex:'100'}}>
          <div style={{ paddingLeft:'1rem' }}>
        <Logo />
        </div>
      <span className={styles.tip}>                                <button
                                          style={{textAlign:'center',height:'25px', width:'65px', fontSize: '0.6rem'}} 
                                          onClick={() => history(OTHER_ROUTE)}
                                      >
                                          Админка
                                      </button></span>
      <span className={styles.tip} onClick={() => history(MAGAZINE_ROUTE)} style={{cursor: 'pointer'}}>
                                          MAGAZINE
                                      </span>
      <span className={styles.tip}>CONTACTS</span>
      <div>
      <NavBar />

      </div>

      </div>
      
    )
}

    export default Menu;
