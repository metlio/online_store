import React, {useContext} from 'react';
import {Context} from "../index";
//import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import {Row} from "react-bootstrap";
//import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, TVOROG_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
//import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom'
//import Header from './Layout/Header';
import styles from './NavBar.module.css'
//import Logo from './Logo'
import jwt_decode from "jwt-decode";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()
    let userinfo = jwt_decode(localStorage.token)
    const user_mail = userinfo.email
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <div>   
                    {user.isAuth ?
                        <div style={{display:'flex', borderRadius:'5px', backgroundColor:'#fff'}}>
                     
                                <button
                                    style={{textAlign:'center',height:'25px', width:'65px', fontSize: '0.6rem'}} 
                                    onClick={() => history(ADMIN_ROUTE)}
                                >
                                    Админка
                                </button>

                                <button
                                    style={{textAlign:'center',height:'25px', width:'60px', fontSize: '0.6rem'}} 
                                    onClick={() => logOut()}
                                >
                                        Выйти
                                </button>
                        </div>
                        :
                        <div>
                            <button variant={"outline-light"} style={{fontSize: '0.5rem', color: "black", borderColor:'black'}} onClick={() => history(LOGIN_ROUTE)}>
                                Авторизация
                            </button>
                        </div>
                    }
                </div>    
    );
});

export default NavBar;