import React from "react";
import styles from "./Form.module.css";

export default function Form({ formTitle, children, ...other }) {
   return (
      <div className={styles.form}>
         <h2 className={styles.formTitle}>{formTitle}</h2>
         {children}
      </div>
   );
}
