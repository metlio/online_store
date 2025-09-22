import React from "react";
//import headerImg from '../../assets/av.jpg'
import styles from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {

    return <React.Fragment>
        <header className={styles.header}>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        {/* <div className={styles['main-image']}>
            { <img src={headerImg} alt="заголовок"/> }
        </div> */}
    </React.Fragment>
}

export default Header;