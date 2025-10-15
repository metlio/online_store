import React from 'react';
import './GlitchArt.css';

const GlitchArt = () => {
    return (
        <div className="glitch-container">
            <video autoPlay muted loop id="myVideo">
                <source src="/clouds.mp4" type="video/mp4" />
            </video>
            <div className="glitch" data-text="Think It.">Think It.</div>
        </div>
    );
};

export default GlitchArt;