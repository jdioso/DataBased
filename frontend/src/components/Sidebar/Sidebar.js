import React from "react";
import styles from "./Sidebar.module.css";
import Card from "../Card/Card";

export default function Sidebar({ children, ...other }) {
   return <div className={styles.sidebar}>{children}</div>;
}
