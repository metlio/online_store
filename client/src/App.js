import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import Preorder from './components/Preorder';

import './components/Courusel/Courusel.css';
import './pages/Tvorog.css'
import CartContextProvider from "./store/CartContextProvider";
import Menu from './components/Menu';
import TypeBar from './components/TypeBar';
import UserBar from './components/UserBar';
import useCustomCursor from './hooks/useCustomCursor';
import './cursor.css';

const App = observer(() => {
    useCustomCursor();
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            if (data) {
                try {
                    const decodedUser = jwt_decode(data.token);
                    user.setUser(decodedUser);
                    user.setIsAuth(true);
                } catch (e) {
                    console.error("Failed to decode token on app load:", e);
                    localStorage.removeItem('token');
                }
            }
        }).catch(e => {
            console.error("Failed to check auth on load:", e);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
    <div style={{width:'100vw', top:'0px'}}>
        <CartContextProvider>
        <BrowserRouter>
            <div style={{backgroundColor:'white'}}>
            <AppRouter />
            </div>

        </BrowserRouter>
        </CartContextProvider>
    </div>
    );
});

export default App;
