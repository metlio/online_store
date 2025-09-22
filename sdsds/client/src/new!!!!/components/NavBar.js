import React, { useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

const NavBar = observer(() => {

    const {user}= useContext(Context)
    const history = useNavigate()
    console.log(user)
    console.log(user.isAuth)
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <div>   
                    {user.isAuth ?
                        <div style={{display:'flex'}}>
                                <button
                                    style={{textAlign:'right',height:'25px', width:'65px',backgroundColor:'none', fontSize: '0.6rem'}} 
                                    onClick={() => history(ADMIN_ROUTE)}
                                >
                                    Админ
                                </button>
                                <button
                                    style={{textAlign:'right',height:'25px', width:'60px',backgroundColor:'none', fontSize: '0.6rem'}} 
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
}
)

export default NavBar;