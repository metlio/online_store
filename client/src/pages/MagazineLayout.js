import React, { useState, useEffect, useRef } from 'react';
import Shop from './Shop';
import Footer from '../components/Layout/Footer';

const MagazineLayout = () => {
    const [footerHeight, setFooterHeight] = useState(0);
    const footerRef = useRef(null);

    useEffect(() => {
        const updateHeight = () => {
            if (footerRef.current) {
                setFooterHeight(footerRef.current.offsetHeight);
            }
        };

        const resizeObserver = new ResizeObserver(updateHeight);
        if (footerRef.current) {
            resizeObserver.observe(footerRef.current);
        }

        updateHeight();
        return () => resizeObserver.disconnect();
    }, []);

    return (
        <div style={{ position: 'relative', backgroundColor: 'white' }}>
            {/* Основной контент с белым фоном, который перекрывает подвал */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                backgroundColor: 'white',
                minHeight: '100vh',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
                <Shop />
            </div>

            {/* Распорка, которая позволяет увидеть фиксированный подвал при прокрутке */}
            <div style={{ height: footerHeight, position: 'relative', zIndex: 0 }} />

            {/* Фиксированный подвал, находящийся "под" основным контентом */}
            <div
                ref={footerRef}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1
                }}
            >
                <Footer />
            </div>
        </div>
    );
};

export default MagazineLayout;