import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Discover.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import Square from "../../components/Square/Square";
import * as uniEndpoints from "../../utils/UniversityEndpoints";
import * as eventEndpoints from "../../utils/EventEndpoints";

export default function Discover() {
   const navigate = useNavigate();

   // change default value to null later
   const [myUniversityID, setMyUniversityID] = useSessionStorage(
      "myUniversityID",
      1
   );

   const [myUniversityEvents, setMyUniversityEvents] = useState([]);

   // grabs information of selected university and opens university info page
   const openUniversity = async () => {
      navigate("/university");
   };
   // grabs information of selected org and opens university info page
   const openOrg = async () => {
      navigate("/org");
   };

   const openEvent = async () => {
      navigate("/event");
   };

   useEffect(() => {
      window.scrollTo(0, 0);
      eventEndpoints.getEventsByUniversity(myUniversityID).then((events) => {
         setMyUniversityEvents([...events]);
      });
   }, []);
   return (
      <>
         <Navbar></Navbar>
         <div className={styles.container}>
            <div className={styles.section}>
               <div className={styles.sectionHeader}>
                  <h1 className={styles.sectionHeaderTitle}>
                     Events at My University{" "}
                  </h1>
                  <Button
                     onClick={(e) => {
                        e.preventDefault();
                        openUniversity();
                     }}
                  >
                     See All
                  </Button>
               </div>
               <div className={styles.slider}>
                  <Square squareTitle="Event Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openEvent();
                        }}
                     >
                        Open
                     </Button>
                  </Square>
                  <Square squareTitle="Event Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openEvent();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Event Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openEvent();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Event Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openEvent();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Event Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openEvent();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Event Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openEvent();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Event Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openEvent();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Event Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openEvent();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="Event Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openEvent();
                        }}
                     >
                        Open
                     </Button>
                  </Square>
               </div>
            </div>
            <div className={styles.section}>
               <div className={styles.sectionHeader}>
                  <h1 className={styles.sectionHeaderTitle}>Search By RSO</h1>
                  <input placeholder="Enter RSO"></input>
               </div>
               <div className={styles.slider}>
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
                     </Button>
                  </Square>
               </div>
            </div>
            <div className={styles.section}>
               <div className={styles.sectionHeader}>
                  <h1 className={styles.sectionHeaderTitle}>
                     Search By University
                  </h1>
                  <input placeholder="Enter University"></input>
               </div>
               <div className={styles.slider}>
                  <Square squareTitle="University Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openUniversity();
                        }}
                     >
                        Open
                     </Button>
                  </Square>
                  <Square squareTitle="University Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openUniversity();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="University Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openUniversity();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="University Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openUniversity();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="University Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openUniversity();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="University Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openUniversity();
                        }}
                     >
                        Open
                     </Button>
                  </Square>{" "}
                  <Square squareTitle="University Name">
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           openUniversity();
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
