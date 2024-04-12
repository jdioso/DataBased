import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import logo from "../../assets/logo.png";
export default function Navbar() {
   const navigate = useNavigate();

   return (
      <div className={styles.navbar}>
         <img src={logo} className={styles.logo} />
         <h1 className={styles.appName}>Infinite RSO</h1>
         <div className={styles.navControls}>
            <Button>Admin Toggle</Button>
            <Button
               onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
               }}
            >
               Dashboard
            </Button>
            <Button
               onClick={(e) => {
                  e.preventDefault();
                  navigate("/discover ");
               }}
            >
               Discover
            </Button>
         </div>
      </div>
   );
}
