import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Org.module.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import * as eventEndpoints from "../../utils/EventEndpoints";
import EventForm from "../Event/EventForm";
import * as orgEndpoints from "../../utils/OrgEndpoints";

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

   // variables that control forms
   const [eventForEdit, setEventForEdit] = useState(null);
   const [openAdd, setOpenAdd] = useState(false);
   const canEditEvent = async () => {
      let retval = false;
      const admins = await orgEndpoints.returnUsersRSOs(currentUser);
      admins.forEach(
         (admin) => (retval = retval || currentOrg.rsoID === admin.rsoID)
      );
      return retval;
   };
   const addEvent = async (event, resetForm) => {
      // potentially edit this to reflect new values
      const requestBody = {
         privacy: event.privacy,
         name: event.name,
         description: event.description,
         latitude: event.latitude,
         longitude: event.longitude,
         contactName: event.contactName,
         contactEmail: event.contactEmail,
         contactNumber: event.contactNumber,
         time: event.time,
      };

      const check = window.confirm("Are you sure you want to edit this event?");
      if (canEditEvent() && check) {
         const response = await eventEndpoints.addEvent(requestBody);
         console.log(response);
         setCurrentEvent({ ...event });
      } else {
         window.alert("You do not not have permission to add events.");
      }
      setOpenAdd(false);
   };

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
                     PERSON LOG
                  </div>
               </Sidebar>
            </div>

            <div className={styles.eventsWrapper}>
               <Card cardTitle="Events">
                  <Button o>Add Event</Button>
                  <Button
                     onClick={(e) => {
                        e.preventDefault();
                        setOpenAdd(!openAdd);
                        setEventForEdit({ ...currentEvent });
                     }}
                  >
                     {openAdd ? "Close" : "Add Event"}
                  </Button>
                  {openAdd ? <EventForm addOrEdit={addEvent} /> : ""}

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
