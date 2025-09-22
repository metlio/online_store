import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Image from "react-bootstrap/Image";

const Preorder = observer(() => {
    
    const {brand} = useContext(Context)

    return (
        <div>
            <div style={{width:"100vw", height:"200vh", backgroundColor:"red"}} />
        </div>
    );
});

export default Preorder;