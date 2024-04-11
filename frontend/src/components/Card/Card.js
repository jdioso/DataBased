import React from "react";
import styles from "./Card.module.css";
export default function Card({ cardTitle, children, ...other }) {
   return (
      <div className={styles.card}>
         <h1 className={styles.cardTitle}>{cardTitle}</h1>
         <div className={styles.cardControls}>{children}</div>
      </div>
   );
}
