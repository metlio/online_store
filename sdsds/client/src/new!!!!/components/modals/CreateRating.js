import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import Image from "react-bootstrap/Image";
import {fetchDevices, editRating, fetchOneDevice} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateRating = observer(({person, show, onHide}) => {

    const {device} = useContext(Context)
    const [rate, setRate] = useState(0)
    const [devicer, setDevice] = useState({info: []})

    const addRating = () => {
        
        let shalava = (parseInt(devicer.rating)+parseInt(rate)).toFixed(2);

        let sheya = (parseFloat(shalava / 2)).toFixed(1);
        console.log(sheya)
        // const pers = {"id": person,"rating": rate}
        // let letho = JSON.stringify(pers)
        //const formData = new FormData()
        //formData.append('id', person)
        //formData.append('rating', rate)
        editRating(person, sheya).then(data => onHide())
    }

    useEffect(() => {

        fetchOneDevice(person).then(data => setDevice(data))

    }, [])

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Рейтинг товара
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div>{devicer.name}</div>
                    <Form.Control
                        onChange={e => setRate(e.target.value)}
                        className="mt-3"
                        placeholder="Введите новый рейтинг"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addRating}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateRating;
// import React, {useState, useContext} from 'react';
// import Modal from "react-bootstrap/Modal";
// import {Button, Form} from "react-bootstrap";
// import { editRating } from '../../http/ratingAPI';
// import {observer} from "mobx-react-lite";
// import {Context} from "../../index";

// const CreateRating = observer(({show, onHide}) => {
//     const [value, setValue] = useState('')

//     const {device} = useContext(Context)

//     const addRating = () => {
//         const formData = new FormData()
//         formData.append('id', 8)
//         formData.append('rating', value)
//         editRating(formData).then(data => onHide())
//     }

//     return (
//         <Modal
//             show={show}
//             onHide={onHide}
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     {device._id}sadasd
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Control
//                         value={value}
//                         onChange={e => setValue(e.target.value)}
//                         placeholder={"Введите название рейтинга"}
//                     />
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
//                 <Button variant="outline-success" onClick={addRating}>Добавить</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// })
// export default CreateRating;