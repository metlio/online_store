import React, { useState, useEffect, useRef } from 'react';
import Shop from './Shop';
import Footer from '../components/Layout/Footer';

const MagazineLayout = () => {
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const triggerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1,
            }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            if (triggerRef.current) {
                observer.unobserve(triggerRef.current);
            }
        };
    }, []);

    return (
        <div>
            <Shop />
            <div ref={triggerRef} style={{ height: '1px' }} />
            <Footer isVisible={isFooterVisible} isMagazinePage={true} />
        </div>
    );
};

export default MagazineLayout;