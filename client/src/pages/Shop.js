import React, {useContext, useEffect} from 'react';
//import {Card} from "react-bootstrap";
import Menu from "../components/Menu";
import Col from "react-bootstrap/Col";

import Filter from "../components/Filter";
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
        fetchDevices(null, null, 1, 2, '').then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        device.setLoading(true)
        fetchDevices(
            device.selectedType.id,
            device.selectedBrand.id,
            device.page,
            2,
            device.searchTerm,
            device.sortBy,
            device.minPrice,
            device.maxPrice
        ).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        }).finally(() => device.setLoading(false))
    }, [device.page, device.selectedType, device.selectedBrand, device.searchTerm, device.sortBy, device.minPrice, device.maxPrice])

    const handleSearch = () => {
        fetchDevices(
            device.selectedType.id,
            device.selectedBrand.id,
            device.page,
            2,
            device.searchTerm,
            device.sortBy,
            device.minPrice,
            device.maxPrice
        ).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }


    return (
            <div>
                <Menu/>
                <Filter/>
                <Row className="mt-2">
                    <Col md={9}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by device name..."
                            value={device.searchTerm}
                            onChange={(e) => device.setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col md={3}>
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md={3}>
                        <label htmlFor="sort-select">Sort by:</label>
                        <select
                            id="sort-select"
                            className="form-control"
                            value={device.sortBy}
                            onChange={(e) => device.setSortBy(e.target.value)}
                        >
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="rating_desc">Rating: High to Low</option>
                        </select>
                    </Col>
                </Row>
                {device.loading ? <div>Loading...</div> : <DeviceList/>}
                <Pages/>
            </div>

    );
});

export default Shop;
