import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import Square from "../../components/Square/Square";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
   const navigate = useNavigate();

   // const getMyOrgs = async () => {};

   // grabs information of selected university and opens university info page
   const openUniversity = async () => {
      navigate("/university");
   };

   // grabs information of selected org and opens university info page
   const openOrg = async () => {
      navigate("/org");
   };
   return (
      <>
         <Navbar />
         <div className={styles.container}>
            <div className={styles.sectionHeader}>
               <h1 className={styles.sectionHeaderTitle}>University</h1>
               <Button
                  onClick={(e) => {
                     e.preventDefault();
                     openUniversity();
                  }}
               >
                  Open University
               </Button>
            </div>
            <div className={styles.section}>
               <div className={styles.sectionHeader}>
                  <h1 className={styles.sectionHeaderTitle}>
                     My Organizations
                  </h1>
               </div>
               <div
                  style={{
                     display: "flex",
                     flexWrap: "wrap",
                     gap: "30px",
                  }}
               >
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>{" "}
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>{" "}
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>{" "}
                  </Square>
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Organization Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openOrg();
                        }}
                     >
                        Open
                     </Button>
                  </Square>
               </div>
            </div>
         </div>
      </>
   );
}
