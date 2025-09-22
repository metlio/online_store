import React from 'react';
import styles from './Page.css';

function Page() {
    return (
        <div className={styles.blockface}>
            <div className={styles.init}>1</div>
            <div className={styles.init}>2</div>
            <div className={styles.init}>3</div>
            <div className={styles.init}>4</div>
        </div>
    )
};

export default Page;