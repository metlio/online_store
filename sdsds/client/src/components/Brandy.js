import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Image from "react-bootstrap/Image";

const Brandy = observer(() => {
    
    const {brand} = useContext(Context)

    return (
        <div>
            <Image width={20} height={20} src={process.env.REACT_APP_API_URL + brand.img}/>
        </div>
    );
});

export default Brandy;