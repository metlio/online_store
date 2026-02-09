import React from 'react';
import Shop from './Shop';
import Footer from '../components/Layout/Footer';

const MagazineLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ position: 'relative', zIndex: 2, backgroundColor: 'white' }}>
                <Shop />
            </div>
            <Footer isVisible={true} isMagazinePage={true} />
        </div>
    );
};

export default MagazineLayout;