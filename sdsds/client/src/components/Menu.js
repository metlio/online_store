import React, {useContext} from 'react';
import Logo from './Logo';
import styles from './Menu.module.css';
import NavBar from './NavBar';


function Menu() {

    return (
      <div style={{ display:'flex', alignItems:'center', backgroundColor:'#e7e7e7', justifyContent:'space-between', padding:'3px',paddingRight:'10%', zIndex:'100'}}>
          <div style={{ paddingLeft:'2rem' }}>
        <Logo />
        </div>
      <span className={styles.tip}>DESIGN WORLDWIDE</span>
      <span className={styles.tip}>MAGAZINE</span>
      <span className={styles.tip}>CONTACTS</span>
      <div>
      <NavBar />

      </div>

      </div>
      
    )
}

    export default Menu;
