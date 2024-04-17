import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Discover.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import Square from "../../components/Square/Square";
import * as uniEndpoints from "../../utils/UniversityEndpoints";
import * as orgEndpoints from "../../utils/OrgEndpoints";
import * as eventEndpoints from "../../utils/EventEndpoints";

export default function Discover() {
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

   // data exclusive to discover page
   const [myUniversityEvents, setMyUniversityEvents] = useState([]);
   const [universityList, setUniversityList] = useState([]);
   const [orgs, setOrgs] = useState([]);

   // data for search inputs
   const [orgInput, setOrgInput] = useState(null);
   const [universityInput, setUniversityInput] = useState(null);

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

   // grabs information of event university and opens event info page
   const openEvent = async (event) => {
      setCurrentEvent({ ...event });
      navigate("/event");
   };

   useEffect(() => {
      // window.scrollTo(0, 0);
      eventEndpoints.getEventsByUniversity(myUniversityID).then((events) => {
         if (events) {
            setMyUniversityEvents([...events]);
         }
      });
      orgEndpoints.getOrgs(orgInput).then((orgs) => {
         if (orgs) {
            setOrgs([...orgs]);
         } else {
            setOrgs([]);
         }
      });
      uniEndpoints.getAllUniversities(universityInput).then((universities) => {
         if (universities) {
            setUniversityList([...universities]);
         } else {
            setUniversityList([]);
         }
      });
      console.log(orgInput);
      console.log(universityInput);
   }, [orgInput, universityInput]);
   return (
      <>
         <Navbar></Navbar>
         <div className={styles.container}>
            <div className={styles.section}>
               <div className={styles.sectionHeader}>
                  <h1 className={styles.sectionHeaderTitle}>
                     Events at My University
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
                  <input
                     placeholder="Enter RSO"
                     onChange={(e) => {
                        setOrgInput(e.target.value);
                     }}
                  ></input>
               </div>
               <div className={styles.slider}>
                  {orgs &&
                     orgs.map((org) => (
                        <Square squareTitle={org.name} key={org.rsoID}>
                           <Button
                              size="sm"
                              onClick={(e) => {
                                 e.preventDefault();
                                 openOrg(org);
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
                  <h1 className={styles.sectionHeaderTitle}>
                     Search By University
                  </h1>
                  <input
                     placeholder="Enter University"
                     onChange={(e) => {
                        e.preventDefault();
                        setUniversityInput(e.target.value);
                     }}
                  ></input>
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
