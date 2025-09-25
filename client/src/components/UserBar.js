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
import jwt_decode from "jwt-decode";

const UserBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

    let user_mail = ''
    if (user.isAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userinfo = jwt_decode(token);
                user_mail = userinfo.email;
            } catch (e) {
                console.error("Invalid token:", e);
            }
        }
    }

    return (
        <div style={{display:'flex', alignItems:'center',backgroundColor:'#fff'}}>   
                    <button 
style={{backgroundColor:'#fff', fontSize:'80%'}} 
onClick={() => history(TVOROG_ROUTE)}

>{user.isAuth ? user_mail : ""}
</button>
                
                </div>    
    );
});

export default UserBar;
