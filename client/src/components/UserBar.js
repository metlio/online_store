import React, {useContext} from 'react';
import {Context} from "../index";
//import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import {Row} from "react-bootstrap";
//import {NavLink} from "react-router-dom";
import {TVOROG_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
//import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom'
//import Header from './Layout/Header';
import styles from './NavBar.module.css'
//import Logo from './Logo'

const UserBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

    return (
        <div style={{display:'flex', alignItems:'center',backgroundColor:'#fff'}}>
            {user.isAuth ?
                <button
                    style={{backgroundColor:'#fff', fontSize:'80%'}}
                    onClick={() => history(TVOROG_ROUTE)}
                >
                    {user.user.email}
                </button>
                :
                ""
            }
                
                </div>    
    );
});

export default UserBar;
