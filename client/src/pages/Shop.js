import React, {useContext, useEffect} from 'react';
import Menu from "../components/Menu";
import Col from "react-bootstrap/Col";
import Filter from "../components/Filter";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import {Row, Container} from "react-bootstrap";

const Shop = observer(() => {

    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, device.limit, '').then(data => {
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
            device.limit,
            device.searchTerm,
            device.sortBy,
            device.minPrice,
            device.maxPrice
        ).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        }).finally(() => device.setLoading(false))
    }, [device.page, device.selectedType, device.selectedBrand, device.searchTerm, device.sortBy, device.minPrice, device.maxPrice])


    return (
            <Container>
                <Menu/>
                <Row className="mt-3">
                    <Col>
                        <Filter/>
                    </Col>
                </Row>

                {device.loading ? <div>Загрузка...</div> : <DeviceList/>}
                <Pages/>
            </Container>

    );
});

export default Shop;
