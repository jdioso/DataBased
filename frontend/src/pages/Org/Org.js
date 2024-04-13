import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Org.module.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Sidebar from "../../components/Sidebar/Sidebar";
export default function Org() {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   return (
      <>
         <Navbar />
         <h1 className={styles.header}>Org</h1>
         <div className={styles.container}>
            <div className={styles.sidebarWrapper}>
               <Sidebar className={styles.sidebar}>
                  <div>
                     <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unksnown printer took a galley of type and.
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unksnown printer took a galley of type and.Lorem
                        Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unksnown printer took a galley of type and.Lorem
                        Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unksnown printer took a galley of type and.
                     </p>
                     INFO LOGO
                  </div>
                  <div>
                     <p>Number of Students</p>
                     PERSON LOGO
                  </div>
                  <div>
                     <p>Map</p>
                     MAP LOGO
                  </div>
               </Sidebar>
            </div>

            <div className={styles.eventsWrapper}>
               <Card cardTitle="Events">
                  <ul className={styles.eventList}>
                     <li className={styles.eventItem}>
                        <h2 className={styles.eventItemTitle}>Event Name</h2>
                        <h2 className={styles.eventItemDate}>
                           Date:xxx/xx/xxx
                        </h2>
                        <Button size="sm" hug={true}>
                           Info
                        </Button>
                     </li>
                     <li className={styles.eventItem}>
                        <h2 className={styles.eventItemTitle}>Event Name</h2>
                        <h2 className={styles.eventItemDate}>
                           Date:xxx/xx/xxx
                        </h2>
                        <Button size="sm" hug={true}>
                           Info
                        </Button>
                     </li>
                     <li className={styles.eventItem}>
                        <h2 className={styles.eventItemTitle}>Event Name</h2>
                        <h2 className={styles.eventItemDate}>
                           Date:xxx/xx/xxx
                        </h2>
                        <Button size="sm" hug={true}>
                           Info
                        </Button>
                     </li>
                  </ul>
               </Card>
            </div>
         </div>
      </>
   );
}
