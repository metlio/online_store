import React, {useContext} from 'react';
import {Context} from "../index";
import {TVOROG_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'

const UserBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()
    const user_mail = user.user?.email || ''

    return (
        <div style={{display:'flex', alignItems:'center',backgroundColor:'#fff'}}>
            {user.isAuth &&
                <button
                    style={{backgroundColor:'#fff', fontSize:'80%'}}
                    onClick={() => history(TVOROG_ROUTE)}
                >
                    {user_mail}
                </button>
            }
        </div>
    );
});

export default UserBar;
