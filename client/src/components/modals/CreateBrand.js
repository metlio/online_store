import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createBrand} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateBrand = observer(({show, onHide}) => {
    const [value, setValue] = useState('')
    const [file, setFile] = useState(null)

    const addBrand = () => {
        if (!value) { alert("Проблема с названием"); return; }
        const formData = new FormData()
        formData.append('name', value)
        if (file) {
            formData.append('img', file)
        }
        createBrand(formData).then(data => {
            alert("Бренд добавлен")
            setValue('')
            setFile(null)
            onHide()
        }).catch(err => {
            const message = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : err.message
            alert("Проблема с " + message)
        })
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название бренда"}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateBrand;