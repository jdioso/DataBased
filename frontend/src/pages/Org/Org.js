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
import * as userEndpoints from "../../utils/UserEndpoints";

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
   const [myUniversity, setMyUniversity] = useSessionStorage(
      "myUniversity",
      null
   );
   // contains userID for entire site
   const [currentUser, setCurrentUser] = useSessionStorage("currentUser", null);

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
   const [isMember, setIsMember] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);

   // variables that control forms
   const [eventForEdit, setEventForEdit] = useState(null);
   const [openAdd, setOpenAdd] = useState(false);

   const isOverlapping = async (latitude, longitude, time) => {
      const events = await eventEndpoints.getAllEvents();
      let retval = false;
      events.forEach((event) => {
         retval =
            retval ||
            (event.time === time &&
               event.latitude === latitude &&
               event.longitude === longitude);
      });
      return retval;
   };
   const addEvent = async (event, resetForm) => {
      // potentially edit this to reflect new values
      const requestBody = {
         ...event,
         rsoID: event.privacy === "RSO" ? currentOrg.rsoID : null,
         universityID: myUniversity.universityID,
         approved: "true",
      };

      const check = window.confirm("Are you sure you want to add this event?");
      if (isAdmin) {
         console.log(isAdmin);
         // console.log(requestBody);
         if (check) {
            if (
               await isOverlapping(event.latitude, event.longitude, event.time)
            ) {
            } else {
               const response = await eventEndpoints.addEvent(requestBody);
               // setOpenAdd(false);
               eventEndpoints
                  .getEventsByOrg(currentOrg.rsoID)
                  .then((events) => {
                     if (events) {
                        setOrgEvents([...events]);
                     } else {
                        setOrgEvents([]);
                     }
                  });
            }
         }
      } else {
         window.alert("You do not not have permission to add events.");
      }
   };

   // grabs information of event university and opens event info page
   const openEvent = async (event) => {
      setCurrentEvent({ ...event });
      navigate("/event");
   };

   // function that returns true if current user is member of rso
   // returns false if not
   const checkIfMember = async () => {
      let retval = false;
      const userRSOs = await orgEndpoints.returnMemberRSOs(currentUser);
      console.log(userRSOs);
      if (userRSOs) {
         userRSOs.forEach((rso) => {
            retval = retval || rso.rsoID === currentOrg.rsoID;
         });
      }
      setIsMember(retval);
   };

   // returns false if not
   const checkIfAdmin = async () => {
      let retval = false;
      const userRSOs = await orgEndpoints.returnMemberRSOs(currentUser);
      if (userRSOs) {
         userRSOs.forEach((rso) => {
            retval = retval || rso.rsoID === currentOrg.rsoID;
         });
      }
      setIsAdmin(retval);
   };

   useEffect(() => {
      window.scrollTo(0, 0);
      checkIfMember();
      checkIfAdmin();
      eventEndpoints.getEventsByOrg(currentOrg.rsoID).then((events) => {
         if (events && isMember) {
            setOrgEvents([...events]);
         } else {
            setOrgEvents([]);
         }
      });

      // get events for current org
   }, [isMember]);
   return (
      <>
         <Navbar />
         <div>
            <h1 className={styles.header}>{currentOrg.name}</h1>
         </div>

         <div className={styles.container}>
            <div className={styles.sidebarWrapper}>
               <Sidebar className={styles.sidebar}>
                  <div>
                     <p>Description {currentOrg.description}</p>
                     INFO LOGO
                  </div>
                  <div>
                     <p>Number of Members: {currentOrg.numMembers}</p>
                     PERSON LOGgit
                  </div>

                  {isMember ? (
                     <Button
                        onClick={(e) => {
                           e.preventDefault();
                           orgEndpoints
                              .removeRSOMember(currentOrg.rsoID, currentUser)
                              .then(() => {
                                 checkIfMember();
                              });
                        }}
                     >
                        Leave RSO
                     </Button>
                  ) : (
                     <Button
                        onClick={(e) => {
                           e.preventDefault();
                           orgEndpoints
                              .addRSOMember(currentOrg.rsoID, {
                                 userID: currentUser,
                              })
                              .then(() => {
                                 checkIfMember();
                              });
                        }}
                     >
                        Join
                     </Button>
                  )}
               </Sidebar>
            </div>

            <div className={styles.eventsWrapper}>
               <Card cardTitle="Events">
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
