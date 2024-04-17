import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./University.module.css";
import { useSessionStorage } from "usehooks-ts";
import * as eventEndpoints from "../../utils/EventEndpoints";
import Button from "../../components/Button/Button";
import Square from "../../components/Square/Square";

const universityPlaceholder = {
   universityID: 4,
   name: "UCFItsedlf",
   location: "Atlanta dummy",
   description: "smart people factory",
   saID: 3,
   domain: "UCF",
   numStudents: 10000,
};

export default function University() {
   const [currentUser, setCurrentUser] = useSessionStorage("currentUser", 1);

   // contains data for event page
   const [currentUniversity, setCurrentUniversity] = useSessionStorage(
      "currentUniversity",
      universityPlaceholder
   );
   // change default value to null later
   const [myUniversityID, setMyUniversityID] = useSessionStorage(
      "myUniversityID",
      4
   );

   // page specific data
   const [publicEvents, setPublicEvents] = useState([]);
   const [privateEvents, setPrivateEvents] = useState([]);

   // returns true if current user is a student of the current university
   // returns false if not
   function isUniStudent() {
      // get email of student
      // get univeristy from email domain
      // compare the the id of that university and the current university
      // return true if they are the same, return else if not
      return true;
   }

   useEffect(() => {
      // window.scrollTo(0, 0);
      eventEndpoints
         .getEventsByUniversity(currentUniversity.universityID, "public")
         .then((publicEvents) => {
            if (publicEvents) {
               setPublicEvents([...publicEvents]);
            }
         });
      eventEndpoints
         .getEventsByUniversity(currentUniversity.universityID, "private")
         .then((privateEvents) => {
            if (privateEvents && isUniStudent()) {
               setPrivateEvents([...privateEvents]);
            }
         });
   }, [currentUniversity]);
   return (
      <>
         <Navbar></Navbar>
         <h1 className={styles.header}>{currentUniversity.name}</h1>
         <div className={styles.container}>
            <div className={styles.sidebarWrapper}>
               <Sidebar className={styles.sidebar}>
                  <div>
                     <p>Description: {currentUniversity.description}</p>
                     INFO LOGO
                  </div>
                  <div>
                     <p>Number of Students: {currentUniversity.numStudents}</p>
                     PERSON LOGO
                  </div>
                  <div>
                     <p>Location: {currentUniversity.location}</p>
                     MAP LOGO
                  </div>
               </Sidebar>
            </div>
            <div
               className={styles.banner}
               style={{
                  background: `url(https://www.ucf.edu/wp-content/blogs.dir/20/files/2021/09/ucf-2022-rankings.jpg)`,
                  backgroundPosition: "center",
               }}
            ></div>
            <div className={`${styles.section} ${styles.orgs}`}>
               <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionHeaderTitle}>Organizations</h2>
               </div>

               <div className={styles.slider}>
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
            <div className={`${styles.section} ${styles.eventsWrapper}`}>
               <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionHeaderTitle}>Events</h2>
               </div>

               <div className={styles.events}>
                  <Card cardTitle="Everyone Welcome">
                     <ul className={styles.eventList}>
                        {publicEvents &&
                           publicEvents.map((event) => (
                              <li
                                 className={styles.eventItem}
                                 key={event.eventID}
                              >
                                 <h2 className={styles.eventItemTitle}>
                                    {event.name}
                                 </h2>
                                 <h2 className={styles.eventItemDate}>
                                    Date:{event.date}
                                 </h2>
                                 <Button size="sm" hug={true}>
                                    Info
                                 </Button>
                              </li>
                           ))}
                     </ul>
                  </Card>
                  <Card cardTitle="University Only">
                     <ul className={styles.eventList}>
                        {privateEvents &&
                           privateEvents.map((event) => (
                              <li
                                 className={styles.eventItem}
                                 key={event.eventID}
                              >
                                 <h2 className={styles.eventItemTitle}>
                                    {event.name}
                                 </h2>
                                 <h2 className={styles.eventItemDate}>
                                    Date:{event.date}
                                 </h2>
                                 <Button size="sm" hug={true}>
                                    Info
                                 </Button>
                              </li>
                           ))}
                     </ul>
                  </Card>
               </div>
            </div>
         </div>
      </>
   );
}
