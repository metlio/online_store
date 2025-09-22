import React, {useEffect, useState} from 'react';
import stylers from './MainTheme.module.css';


const MainTheme = () => {

    const [ width, setWidth ] = useState(0);

    useEffect(() => {
        setInterval(() => {
        setWidth((prev) => window.scrollY/5);
    }, 1);
    }, setWidth);

    const styles = {
        backgroundPositionY: `-${width}px`,
        backgroundImage: `url("/static/media/de.e060413cca0a862857e3.png")`,
        height: '30vh',
        zIndex: '3',
        backgroundSize: '100%',
        backgroundPosition: '50% 0px',
        backgroundAttachment: 'fixed',
        transition: 'height 0.5s ease-in'
        };

    return (
        
        <section>
            
                <section style={styles}>                  
                </section>
        </section>        
    );
};

export default MainTheme;