import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
//import {Pagination} from "react-bootstrap";
import Tilt from "react-parallax-tilt"
import styles from './styles.module.css'

const Pages = observer(() => {
    const {device} = useContext(Context)
    const pageCount = Math.ceil(device.totalCount / 8)
    const pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        
        <div style={{padding:'1rem', height:'6rem',fontSize:'20px', display:'flex', justifyContent:'center', backgroundColor:'#0e0e0e'}}>
            {pages.map(page =>
                <div
                    className={styles.typo}
                    key={page}
                    active={(device.page === page ? "true" : "false")}
                    onClick={() => device.setPage(page)}
                >
                    {page}
                </div>
            )}
        </div>
    );
});

export default Pages;