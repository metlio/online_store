import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateRating from '../components/modals/CreateRating';
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)


    return (
        <div style={{backgroundColor:'#fff', minHeight:'85vh', width:'100%',display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div style={{display:'flex',flex:'1',  justifyContent:'center'}}>
            <button
                onClick={() => setTypeVisible(true)}
            >
                Тип
            </button>
            </div>
            <div  style={{display:'flex', flex:'1', justifyContent:'center'}}>
            <button
                onClick={() => setBrandVisible(true)}
            >
                Бренд
            </button>
            </div>
            <div style={{display:'flex', flex:'1', justifyContent:'center'}}>
            <button
                onClick={() => setDeviceVisible(true)}
            >
                Устройство
            </button>
            </div>

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </div>
    );
};

export default Admin;