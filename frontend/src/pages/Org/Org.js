import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Org.module.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import * as eventEndpoints from "../../utils/EventEndpoints";
const orgPlaceholder = {
   rsoID: -1,
   adminID: -1,
   status: null,
   name: "RSO NAME",
   numMembers: 5,
   description: "RSO DESCRIPTION",
};
export default function Org() {
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
   const [orgEvents, setOrgEvents] = useState([]);
   // grabs information of event university and opens event info page
   const openEvent = async (event) => {
      setCurrentEvent({ ...event });
      navigate("/event");
   };

   // function that returns true if current user is member of rso
   // returns false if not
   const isOrgMember = () => {};
   useEffect(() => {
      window.scrollTo(0, 0);
      eventEndpoints.getEventsByOrg(currentOrg.rsoID).then((events) => {
         if (events) {
            setOrgEvents([...events]);
         } else {
            setOrgEvents([]);
         }
      });
      // get events for current org
   }, [currentOrg]);
   return (
      <>
         <Navbar />
         <h1 className={styles.header}>{currentOrg.name}</h1>
         <div className={styles.container}>
            <div className={styles.sidebarWrapper}>
               <Sidebar className={styles.sidebar}>
                  <div>
                     <p>Description {currentOrg.description}</p>
                     INFO LOGO
                  </div>
                  <div>
                     <p>Number of Members: {currentOrg.numMembers}</p>
                     PERSON LOGO
                  </div>
               </Sidebar>
            </div>

            <div className={styles.eventsWrapper}>
               <Card cardTitle="Events">
                  <ul className={styles.eventList}>
                     {orgEvents &&
                        orgEvents.map((event) => (
                           <li className={styles.eventItem} key={event.eventID}>
                              <h2 className={styles.eventItemTitle}>
                                 {event.name}
                              </h2>
                              <h2 className={styles.eventItemDate}>
                                 Date:{event.date}
                              </h2>
                              <Button
                                 size="sm"
                                 hug={true}
                                 onClick={(e) => {
                                    e.preventDefault();
                                    openEvent(event);
                                 }}
                              >
                                 Info
                              </Button>
                           </li>
                        ))}
                  </ul>
               </Card>
            </div>
         </div>
      </>
   );
}
