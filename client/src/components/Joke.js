import React from "react";
import styles from "./Joke.module.css";
import Image from 'react-bootstrap/Image';
import { getImageUrl } from "../utils/getImageUrl";

const Joke = (props) => {

  return (
    <li className={styles.joke}>
      <h2>{props.name}</h2>
      <h2>{props.img}</h2>
      <h3>{props.updatedAt}</h3>
      <div><Image width={200} height={200} src={getImageUrl(props.img)}/></div>
    </li>
  );
};

export default Joke;
