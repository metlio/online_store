import React, { useState, useEffect, useRef } from 'react';
import Shop from './Shop';
import Footer from '../components/Layout/Footer';

const MagazineLayout = () => {
    const [scale, setScale] = useState(1);
    const footerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;

            const scrollY = window.scrollY;
            const contentHeight = contentRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Начало раскрытия футера - когда мы проскроллили весь основной контент
            if (scrollY > contentHeight - viewportHeight) {
                // Прогресс раскрытия от 0 до 1
                const progress = Math.min(Math.max((scrollY - (contentHeight - viewportHeight)) / viewportHeight, 0), 1);
                // Уменьшаем масштаб от 1 до 0.9 (или другого значения)
                const newScale = 1 - (progress * 0.05); // Уменьшаем на 5%
                setScale(newScale);
            } else {
                setScale(1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ position: 'relative', backgroundColor: 'white' }}>
            {/* Основной контент с белым фоном, который перекрывает подвал */}
            <div
                ref={contentRef}
                style={{
                    position: 'relative',
                    zIndex: 2,
                    backgroundColor: 'white',
                    minHeight: '100vh',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
            >
                <Shop />
            </div>

            {/* Распорка высотой 100vh, которая позволяет увидеть фиксированный подвал при прокрутке */}
            <div style={{ height: '100vh', position: 'relative', zIndex: 0 }} />

            {/* Фиксированный подвал на всю высоту экрана, находящийся "под" основным контентом */}
            <div
                ref={footerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0b0b0b' // Цвет фона футера
                }}
            >
                <div style={{
                    width: '100%',
                    transform: `scale(${scale})`,
                    transition: 'transform 0.1s ease-out' // Плавность для скролла
                }}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default MagazineLayout;