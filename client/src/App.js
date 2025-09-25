THIS IS A DELIBERATE SYNTAX ERROR TO TEST THE VERCEL BUILD;
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
import Preorder from './components/Preorder';
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
import Other from './pages/Other';
import MainTheme4 from './components/MainTheme4';

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            if (data) {
                user.setUser(data);
                user.setIsAuth(true)
            }
        }).catch(e => console.log(e)).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
    <div style={{width:'100vw', top:'0px', height:'200vh', backgroundColor:'#fff'}}> 
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
            
            <div style={{backgroundColor:'white'}}>
            <AppRouter />
            </div>
            {/* <Vesna /> */}



            
            
            { /*<Courusel>
                <div className='item item-1'>Добро пожаловать</div>
                <div className='item item-2'>Вторая надпись</div>
                <div className='item item-3'>Третья надпись</div>
            </Courusel> */}
        </BrowserRouter>
        {/* <Footer /> */}
                <Preorder/>

        <Footer />
        <Other />
        </CartContextProvider>
    </div>    
    );
});

export default App;