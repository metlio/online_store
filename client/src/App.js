import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import Happ from './Happ'
import Preorder from './components/Preorder';
import Footer from './components/Layout/Footer';
import './components/Courusel/Courusel.css';
import './pages/Tvorog.css'
import CartContextProvider from "./store/CartContextProvider";
import Menu from './components/Menu';
import TypeBar from './components/TypeBar';
import UserBar from './components/UserBar';
import Other from './pages/Other';
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
        <Menu />
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around',backgroundColor:'#fff'}}>
        <TypeBar />
        <UserBar />
        </div>
            <Happ />
            <div style={{backgroundColor:'white'}}>
            <AppRouter />
            </div>
        </BrowserRouter>
        <Other />
        <Footer />
        </CartContextProvider>
    </div>
    );
});

export default App;
