import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import Square from "../../components/Square/Square";
import styles from "./Dashboard.module.css";
import { useSessionStorage } from "usehooks-ts";
import * as orgEndpoints from "../../utils/OrgEndpoints";
import * as uniEndpoints from "../../utils/UniversityEndpoints";

export default function Dashboard() {
   const navigate = useNavigate();

   // contains userID for entire site
   // change default value to null later
   const [myUniversityID, setMyUniversityID] = useSessionStorage(
      "myUniversityID",
      4
   );
   const [currentUser, setCurrentUser] = useSessionStorage("currentUser", 1);

   // contains data for university page
   const [currentUniversity, setCurrentUniversity] = useSessionStorage(
      "currentUniversity",
      null
   );
   // contains data for org/rso page
   const [currentOrg, setCurrentOrg] = useSessionStorage("currentOrg", null);
   // contains data for event page
   const [currentEvent, setCurrentEvent] = useSessionStorage(
      "currentEvent",
      null
   );

   // page specific data
   const [orgs, setOrgs] = useState([]);

   // grabs information of selected university and opens university info page
   const openUniversity = async (university) => {
      setCurrentUniversity({ ...university });
      navigate("/university");
   };

   // grabs information of selected org and opens university info page
   const openOrg = async (org) => {
      setCurrentOrg({ ...org });
      navigate("/org");
   };

   // const renderMyOrgs = async () => {
   //    const comments = await orgEndpoints.getEventComments(
   //       currentEvent.eventID
   //    );

   //    if (comments) {
   //       setComments(comments);
   //    } else {
   //       setComments([]);
   //    }
   // };
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
