import React, { Children } from "react";
import styles from "./Button.module.css";
export default function Button({
   text,
   size,
   onClick,
   children,
   hug = false,
   ...other
}) {
   return (
      <button
         className={size === "lg" ? styles.buttonLg : styles.buttonSm}
         onClick={onClick}
      >
         {children}
      </button>
   );
}
