import React from "react";

import Joke from "./Joke";
import styles from "./JokeList.module.css";

const JokeList = (props) => {
  return (
    <ul className={styles["joke-list"]}>
      {props.jokes.map((joke) => (
        <Joke
          key={joke.id}
          name={joke.name}
          img={joke.img}
          updatedAt={joke.updatedAt}
        />
      ))}
    </ul>
  );
};

export default JokeList;
