import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, ListGroup, Col, Row} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes, deleteType, deleteBrand, deleteDevice} from "../http/deviceAPI";
import {observer} from "mobx-react-lite";

const Admin = observer(() => {
    const {device} = useContext(Context)
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    const refreshData = () => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 100).then(data => {
            device.setDevices(data.rows)
        })
    }

    useEffect(() => {
        refreshData();
    }, [])

    const removeType = (id) => {
        deleteType(id).then(() => {
            refreshData();
        })
    }

    const removeBrand = (id) => {
        deleteBrand(id).then(() => {
            refreshData();
        })
    }

    const removeDevice = (id) => {
        deleteDevice(id).then(() => {
            refreshData();
        })
    }

    return (
        <Container className="mt-3" style={{backgroundColor:'#fff', minHeight:'85vh', maxWidth:'100%'}}>
            <Row className="mt-2">
                <Col>
                    <Button block onClick={() => setTypeVisible(true)}>Добавить тип</Button>
                </Col>
                <Col>
                    <Button block onClick={() => setBrandVisible(true)}>Добавить бренд</Button>
                </Col>
                <Col>
                    <Button block onClick={() => setDeviceVisible(true)}>Добавить устройство</Button>
                </Col>
            </Row>

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} refresh={refreshData}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} refresh={refreshData}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} refresh={refreshData}/>

            <Row className="mt-5">
                <Col md={4}>
                    <h3>Типы</h3>
                    <ListGroup>
                        {device.types.map(type =>
                            <ListGroup.Item key={type.id} className="d-flex justify-content-between">
                                {type.name}
                                <Button variant="danger" size="sm" onClick={() => removeType(type.id)}>Удалить</Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <h3>Бренды</h3>
                    <ListGroup>
                        {device.brands.map(brand =>
                            <ListGroup.Item key={brand.id} className="d-flex justify-content-between">
                                {brand.name}
                                <Button variant="danger" size="sm" onClick={() => removeBrand(brand.id)}>Удалить</Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <h3>Устройства</h3>
                    <ListGroup>
                        {device.devices.map(d =>
                            <ListGroup.Item key={d.id} className="d-flex justify-content-between">
                                {d.name}
                                <Button variant="danger" size="sm" onClick={() => removeDevice(d.id)}>Удалить</Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
});

export default Admin;