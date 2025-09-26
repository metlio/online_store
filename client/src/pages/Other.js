import React from 'react';
import PaintIcon from "../components/logo.png";
import CartIcon from "../components/cart.png";

const Other = () => {
    return (
        <div style={{
            position: 'sticky',
            top: '0',
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(https://i.postimg.cc/PfMVRsCL/1942d10f-7ae0-4842-b516-3f7d096d308a.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: '8'
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <img src={PaintIcon} alt="My Image"/>
                <img src={CartIcon} alt="My Image"/>
            </div>
            <div style={{
                perspective: '50px',
                height: '80%',
                fontSize: '72pt',
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center'
            }}>
                Hello there!
            </div>
        </div>
    );
};

export default Other;