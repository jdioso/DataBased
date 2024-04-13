import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import Square from "../../components/Square/Square";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
   const navigate = useNavigate();

   // const getMyOrgs = async () => {};
   const openUniversity = async () => {
      navigate("/university");
   };
   const openOrg = async () => {
      navigate("/org");
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
                     openUniversity();
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
