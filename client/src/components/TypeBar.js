import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
//import ListGroup from "react-bootstrap/ListGroup";
//import {useNavigate} from "react-router-dom"
//import {DEVICE_ROUTE} from "../utils/consts"
import styles from './TypeBar.module.css';

const TypeBar = observer(() => {

    const {device} = useContext(Context)

    //const navigate = useNavigate()

    return (
        <div className={styles.dom}>
            {device.types.map(type =>
                <div className={type.id === device.selectedType.id ? styles.lom : styles.pom}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}

                </div>
                
            )}
            
        </div>

    );
});

export default TypeBar;
