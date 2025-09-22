import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
//import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import Happ from './Happ'
//import Counter from './components/Counter';
import Footer from './components/Layout/Footer';
import './components/Courusel/Courusel.css';
import './pages/Tvorog.css'
//import { Courusel } from './components/Courusel/Courusel'
//import Spa from './spa/Spa';
import CartContextProvider from "./store/CartContextProvider";
import MainFill from './components/MainFill';
import MainFill2 from './components/MainFill2';
//import SpringDemo from './components/SpringDemo';
//import Vesna from './components/Vesna';
//import Gulp from './components/MainFill2';
//import PullRelease from './components/MainFill2';
import Logo from './components/Logo';
import Menu from './components/Menu';
import TypeBar from './components/TypeBar';
import UserBar from './components/UserBar';

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <CartContextProvider>
        <BrowserRouter>

        <Menu />
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around',backgroundColor:'#fff'}}>
        <TypeBar />
        <UserBar />
        </div>
            {/* <SpringDemo/> */}
            <Happ />

            {/* <MainFill /> */}
            {/* <MainFill2 /> */}
            <div style={{backgroundColor:'white'}}>
            <AppRouter />
            </div>
            {/* <Vesna /> */}



            
            
            {/* <Courusel>
                <div className='item item-1'>Добро пожаловать</div>
                <div className='item item-2'>Вторая надпись</div>
                <div className='item item-3'>Третья надпись</div>
            </Courusel> */}
        </BrowserRouter>
        {/* <Footer /> */}
        <Footer />
        </CartContextProvider>
        
    );
});

export default App;