import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import Image from "react-bootstrap/Image";
import {createDevice, fetchBrands, fetchTypes} from "../http/deviceAPI";
import {observer} from "mobx-react-lite";

const NewComponent = observer((props) => {

    const {device} = useContext(Context)

    const sept = props.homa;

    const result = device.brands.find(({ id }) => id === sept);

    if (!result) {
    return null; 
    }
    
    return (
                <div>
                                <div>
                                    <Image height={20}  src={process.env.REACT_APP_API_URL + '/static/' + result.img}/>
                                </div>
                </div>
    );
})

export default NewComponent;
