import React from "react";
import Card from "../Card/Card";
import styles from "./Square.module.css";

// A square is a 200x200 card
// an extra div is added for any buttons the square should have
export default function Square({ squareTitle, children, ...other }) {
   return (
      <div className={styles.square}>
         <h1 className={styles.squareTitle}>{squareTitle}</h1>
         <div className={styles.squareControls}>{children}</div>
      </div>
   );
}
