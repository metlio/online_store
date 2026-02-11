import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import Image from "react-bootstrap/Image";
import {createDevice, fetchBrands, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide, refresh}) => {

    const {device} = useContext(Context)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [rate, setRate] = useState(0)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files)
    }

    const addDevice = () => {
        if (!name || !price || !device.selectedType.id || !device.selectedBrand.id) {
            alert("Пожалуйста, заполните все обязательные поля (название, цена, тип, бренд)")
            return
        }
        if (!file || file.length < 1) {
            alert("Пожалуйста, выберите хотя бы одно изображение")
            return
        }
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file[0])
        if (file[1]) {
            formData.append('imgg', file[1])
        } else {
            // Если второго изображения нет, используем первое как заглушку или второе
            formData.append('imgg', file[0])
        }
        formData.append('rating', rate)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => {
            onHide();
            device.setSelectedType({});
            device.setSelectedBrand({});
            setName('');
            setPrice(0);
            setFile(null);
            setRate(0);
            setInfo([]);
            if (refresh) refresh()
        }).catch(err => {
            alert("Ошибка при добавлении устройства: " + err.message)
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            style={{position:'absolute',margin:'0', display:'flex'}}
        >
            <Modal.Header style={{
                  display:'flex',
                  justifyContent:'flex-end',
                  backgroundColor: '#380149',
                  border: '0px',
                  color:'white',


                }} closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{
                  backgroundColor: '#380149'
                }}>
                <Form>
                <Form.Control
                        style={{backgroundColor:'#380149'}}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="border-secondary text-white mt-0 mb-5"
                        placeholder="Введите название устройства"
                    />
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="btn-secondary">{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="btn-secondary">{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                    <Image width={20} height={20} src={process.env.REACT_APP_API_URL + '/static/' + brand.img}/>
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        style={{width:'100px', backgroundColor:'black', opacity:'70%'}}
                        className="mt-3 text-white"
                        placeholder="Цена"
                        type="number"
                    />
                    <input 
                        type="file" 
                        multiple
                        style={{marginTop:'15px', color:'white', backgroundColor:'grey'}}
                        onChange={selectFile}
                    />
                    <hr/>
                    <Form.Control
                        onChange={e => setRate(e.target.value)}
                        style={{backgroundColor:'#380149'}}
                        className="border-secondary text-white"
                        placeholder="Введите начальный рейтинг"
                    />
                    <Button
                        className="mt-4"
                        variant={"outline-secondary"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    style={{backgroundColor:'#380149'}}
                                    value={i.title}
                                    className='border-secondary'
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    style={{backgroundColor:'#380149'}}
                                    value={i.description}
                                    className='border-secondary'
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer style={{
                  backgroundColor: '#380149',
                  border: '0px'
                }}>
                <button variant="outline-danger" onClick={onHide}>Закрыть</button>
                <button onClick={addDevice}>Добавить</button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;