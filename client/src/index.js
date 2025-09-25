import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import DeviceStore from './store/DeviceStore';
import ShapochkaStore from './store/ShapochkaStore';
import UserStore from './store/UserStore';
import BrandStore from './store/BrandStore';
//import { Provider } from "react-redux";
//import { BrowserRouter } from 'react-router-dom';
//import Spa from './spa/Spa';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{user: new UserStore(), device: new DeviceStore(), shapochka: new ShapochkaStore(), brand: new BrandStore()}}>
    <App />
  </Context.Provider>
  
);