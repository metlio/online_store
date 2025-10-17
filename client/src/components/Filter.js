import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import styles from './Filter.module.css';
import { Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const Filter = observer(() => {
    const { device } = useContext(Context);

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterSection}>
                <h5>Тип</h5>
                <div className={styles.typeBar}>
                    {device.types.map(type =>
                        <div
                            className={`${styles.typeItem} ${type.id === device.selectedType.id ? styles.active : ''}`}
                            onClick={() => device.setSelectedType(type)}
                            key={type.id}
                        >
                            {type.name}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.filterSection}>
                <h5>Бренд</h5>
                <div className={styles.brandBar}>
                    {device.brands.map(brand =>
                        <div
                            key={brand.id}
                            className={`${styles.brandItem} ${brand.id === device.selectedBrand.id ? styles.activeBrand : ''}`}
                            onClick={() => device.setSelectedBrand(brand)}
                        >
                            <Image width={40} src={process.env.REACT_APP_API_URL + '/static/' + brand.img} />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.filterSection}>
                <h5>Цена</h5>
                <div className={styles.priceRange}>
                    <input type="range" min="0" max="100000" className={styles.slider} />
                    <div className={styles.priceValues}>
                        <span>0 ₽</span>
                        <span>100000 ₽</span>
                    </div>
                </div>
            </div>
            <div className={styles.filterSection}>
                <h5>Сортировать по</h5>
                <Form.Select className={styles.sortSelect}>
                    <option>Популярности</option>
                    <option>Цене (возрастание)</option>
                    <option>Цене (убывание)</option>
                </Form.Select>
            </div>
        </div>
    );
});

export default Filter;