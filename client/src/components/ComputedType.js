import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import {fetchShapochka} from "../http/deviceAPI";
import {Image} from "react-bootstrap"

const ComputedType = observer(() => {
    const {shapochka} = useContext(Context)


    return (
        <ListGroup>
            {shapochka.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    key={type.id}
                >
                    {type.name}
                    <Image src={process.env.REACT_APP_API_URL + '/static/' + type.img}/>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default ComputedType;