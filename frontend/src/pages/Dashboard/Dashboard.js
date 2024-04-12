import React from "react";
import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import Square from "../../components/Square/Square";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
   const navigate = useNavigate();

   const getMyOrgs = async () => {};
   const openUniversityInfo = async () => {
      navigate("/university");
   };
   return (
      <>
         <Navbar />
         <div className={styles.container}>
            <div className={styles.flexRow}>
               <h1 className="subheading flex-grow">University</h1>
               <Button
                  onClick={(e) => {
                     e.preventDefault();
                     openUniversityInfo();
                  }}
               >
                  Open University
               </Button>
            </div>
            <div className={styles.flexCol}>
               <h1 className="subheading">My Organizations</h1>
               <div
                  style={{
                     display: "flex",
                     flexWrap: "wrap",
                     gap: "30px",
                  }}
               >
                  <Square squareTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Square>
               </div>
            </div>
         </div>
      </>
   );
}
