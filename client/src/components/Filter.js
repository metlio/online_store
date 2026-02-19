import React, { useContext, useState, useRef, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import styles from './Filter.module.css';
import { Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { FaFilter } from 'react-icons/fa';
import { getImageUrl } from '../utils/getImageUrl';

const Filter = observer(() => {
    const { device } = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.filterWrapper} ref={dropdownRef}>
            <button
                className={styles.filterToggleButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaFilter style={{marginRight: '8px'}} /> Фильтры
            </button>

            {isOpen && (
                <div className={styles.filterDropdown}>
                    <div className={styles.filterSection}>
                        <h5>Поиск</h5>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Найти..."
                            value={device.searchTerm}
                            onChange={(e) => device.setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className={styles.filterSection}>
                        <h5>Тип</h5>
                        <div className={styles.typeBar}>
                            <div
                                className={`${styles.typeItem} ${!device.selectedType.id ? styles.active : ''}`}
                                onClick={() => device.setSelectedType({})}
                            >
                                Все
                            </div>
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
                            <div
                                className={`${styles.brandItem} ${!device.selectedBrand.id ? styles.activeBrand : ''}`}
                                onClick={() => device.setSelectedBrand({})}
                                style={{padding: '5px 10px', display: 'flex', alignItems: 'center'}}
                            >
                                Все
                            </div>
                            {device.brands.map(brand =>
                                <div
                                    key={brand.id}
                                    className={`${styles.brandItem} ${brand.id === device.selectedBrand.id ? styles.activeBrand : ''}`}
                                    onClick={() => device.setSelectedBrand(brand)}
                                >
                                    <Image width={30} src={getImageUrl(brand.img)} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.filterSection}>
                        <h5>Цена</h5>
                        <div className={styles.priceRange}>
                            <div className={styles.priceInput}>
                                <label>Мин: {device.minPrice} ₽</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100000"
                                    step="100"
                                    value={device.minPrice}
                                    onChange={(e) => device.setMinPrice(Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>
                            <div className={styles.priceInput}>
                                <label>Макс: {device.maxPrice} ₽</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100000"
                                    step="100"
                                    value={device.maxPrice}
                                    onChange={(e) => device.setMaxPrice(Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.filterSection}>
                        <h5>Сортировка</h5>
                        <Form.Select
                            className={styles.sortSelect}
                            value={device.sortBy}
                            onChange={(e) => device.setSortBy(e.target.value)}
                        >
                            <option value="price_asc">Цена (возрастание)</option>
                            <option value="price_desc">Цена (убывание)</option>
                            <option value="rating_desc">Рейтинг</option>
                        </Form.Select>
                    </div>

                    <div className={styles.filterActions}>
                         <Button
                            variant="outline-dark"
                            size="sm"
                            onClick={() => {
                                device.setSelectedType({});
                                device.setSelectedBrand({});
                                device.setMinPrice(0);
                                device.setMaxPrice(100000);
                                device.setSearchTerm("");
                            }}
                            className="w-100"
                         >
                            Сбросить все
                         </Button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default Filter;
