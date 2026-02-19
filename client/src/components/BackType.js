import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Image} from "react-bootstrap"
import {Card, Form} from "react-bootstrap";
import { getImageUrl } from '../utils/getImageUrl';

const BackType = observer(() => {
    
    const {device} = useContext(Context)

    return (
        <Form className="d-flex">
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    className="p-3"
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    <Image width={20} height={20} src={getImageUrl(brand.img)}/>{brand.name}
                </Card>
            )}
        </Form>
    );
});

export default BackType;