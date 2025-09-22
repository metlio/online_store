import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index"
;
const Edit = observer(() => {
    const {device} = useContext(Context)
    return (
        <div>
            {device.types.map(type =>
                <div key={device.id}>{device.name}
                </div>)}
        </div>
    )
            })

export default Edit;