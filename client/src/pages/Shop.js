import React, {useContext, useEffect} from 'react';
//import {Card} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import ComputedType from "../components/ComputedType";
import BackType from "../components/BackType";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import {Row} from "react-bootstrap";
import MainTheme from '../components/MainTheme';
import MainTheme2 from '../components/MainTheme2';
import MainTheme3 from '../components/MainTheme3';
import MainTheme4 from '../components/MainTheme4';
import Page from './Page';
//import MealList from '../components/Meals/MealList';
//import Meals from '../components/Meals/Meals';

const Shop = observer(() => {

    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])




    return (
            <div>
                <TYpeBar/>
                <BrandBar/>
                <DeviceList/>
                <Pages/>
            </div>

    );
});

export default Shop;
