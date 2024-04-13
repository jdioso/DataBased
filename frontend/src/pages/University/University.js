import React from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./University.module.css";

import Button from "../../components/Button/Button";
import Square from "../../components/Square/Square";

export default function University() {
   return (
      <>
         <Navbar></Navbar>
         <h1 className={styles.header}>University</h1>
         <div className={styles.container}>
            <div className={styles.sidebarWrapper}>
               <Sidebar className={styles.sidebar}>
                  <div>
                     <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unksnown printer took a galley of type and. when
                        an unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type andwhen an
                        unksnown printer took a galley of type and
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
                        <li className={styles.eventItem}>
                           <h2 className={styles.eventItemTitle}>Event Name</h2>
                           <h2 className={styles.eventItemDate}>
                              Date:**/**/****
                           </h2>
                           <Button size="sm" hug={true}>
                              Info
                           </Button>
                        </li>
                        <li className={styles.eventItem}>
                           <h2 className={styles.eventItemTitle}>Event Name</h2>
                           <h2 className={styles.eventItemDate}>
                              Date:**/**/****
                           </h2>
                           <Button size="sm" hug={true}>
                              Info
                           </Button>
                        </li>
                        <li className={styles.eventItem}>
                           <h2 className={styles.eventItemTitle}>Event Name</h2>
                           <h2 className={styles.eventItemDate}>
                              Date:**/**/****
                           </h2>
                           <Button size="sm" hug={true}>
                              Info
                           </Button>
                        </li>
                     </ul>
                  </Card>
                  <Card cardTitle="University Only">
                     <ul className={styles.eventList}>
                        <li className={styles.eventItem}>
                           <h2 className={styles.eventItemTitle}>Event Name</h2>
                           <h2 className={styles.eventItemDate}>
                              Date:**/**/****
                           </h2>
                           <Button size="sm" hug={true}>
                              Info
                           </Button>
                        </li>
                        <li className={styles.eventItem}>
                           <h2 className={styles.eventItemTitle}>Event Name</h2>
                           <h2 className={styles.eventItemDate}>
                              Date:**/**/****
                           </h2>
                           <Button size="sm" hug={true}>
                              Info
                           </Button>
                        </li>
                        <li className={styles.eventItem}>
                           <h2 className={styles.eventItemTitle}>Event Name</h2>
                           <h2 className={styles.eventItemDate}>
                              Date:**/**/****
                           </h2>
                           <Button size="sm" hug={true}>
                              Info
                           </Button>
                        </li>
                     </ul>
                  </Card>
               </div>
            </div>
         </div>
      </>
   );
}
