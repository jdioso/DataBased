import React from "react";
import styles from "./Button.module.css";

export default function Button({
   text,
   size,
   onClick,
   children,
   hug = false,
   ...other
}) {
   let className;
   if (size === "sm") className = styles.buttonSm;
   else if (size === "lg") className = styles.buttonLg;
   else className = styles.buttonMd;

   return (
      <button className={className} onClick={onClick}>
         {children}
      </button>
   );
}
