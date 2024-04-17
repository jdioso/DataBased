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

   // contains data for event page
   const [currentEvent, setCurrentEvent] = useSessionStorage(
      "currentEvent",
      null
   );
   const [currentUniversity, setCurrentUniversity] = useSessionStorage(
      "currentUniversity",
      null
   );
   // change default value to null later
   const [myUniversityID, setMyUniversityID] = useSessionStorage(
      "myUniversityID",
      4
   );

   // data exclusive to discover page
   const [myUniversityEvents, setMyUniversityEvents] = useState([]);
   const [universityList, setUniversityList] = useState([]);

   // grabs information of event university and opens event info page
   const openEvent = async (event) => {
      setCurrentEvent({ ...event });
      navigate("/event");
   };

   // grabs information of selected university and opens university info page
   const openUniversity = async (university) => {
      setCurrentUniversity({ ...university });
      navigate("/university");
   };
   // grabs information of selected org and opens university info page
   const openOrg = async () => {
      navigate("/org");
   };

   useEffect(() => {
      window.scrollTo(0, 0);
      eventEndpoints.getEventsByUniversity(myUniversityID).then((events) => {
         if (events) {
            setMyUniversityEvents([...events]);
         }
      });
      uniEndpoints.getAllUniversities().then((universities) => {
         if (universities) {
            setUniversityList([...universities]);
         }
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
                  {myUniversityEvents &&
                     myUniversityEvents.map((event) => (
                        <Square squareTitle={event.name} key={event.eventID}>
                           <Button
                              size="sm"
                              onClick={(e) => {
                                 e.preventDefault();
                                 openEvent(event);
                              }}
                           >
                              Open
                           </Button>
                        </Square>
                     ))}
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
                  {universityList &&
                     universityList.map((university) => (
                        <Square
                           squareTitle={university.name}
                           key={university.universityID}
                        >
                           <Button
                              size="sm"
                              onClick={(e) => {
                                 e.preventDefault();
                                 openUniversity(university);
                              }}
                           >
                              Open
                           </Button>
                        </Square>
                     ))}
               </div>
            </div>
         </div>
      </>
   );
}
