import React from "react";
import styles from "./Card.module.css";

// A card is an element with light background and dark text
// By default, it has no specifed dimensions
// It is a flex container with items centered in a column
export default function Card({ cardTitle, children, ...other }) {
   return (
      <div className={styles.card}>
         <h2 className={styles.cardTitle}>{cardTitle}</h2>
         <div className={styles.cardContent}>{children}</div>
      </div>
   );
}
