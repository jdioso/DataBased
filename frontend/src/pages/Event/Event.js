import React, { useEffect, useState } from "react";
import styles from "./Event.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";
import { useSessionStorage } from "usehooks-ts";
import * as commentsEndpoints from "../../utils/CommentsEndpoints";
const eventPlaceholder = {
   eventID: -1,
   eventType: "EVENT TYPE",
   privacy: "EVENT PRIVACY",
   name: "EVENT NAME",
   description: "EVENT DESCRIPTION",
   latitude: "0",
   longitude: "0",
   contactName: "CONTACT NAME",
   contactEmail: "CONTACT EMAIL",
   contactNumber: "CONTACT PHONE",
   time: "TIME",
   date: "DATE",
   universityID: -1,
   rsoID: null,
   approved: false,
};

export default function Event() {
   // contains data for event page
   const [currentEvent, setCurrentEvent] = useSessionStorage(
      "currentEvent",
      eventPlaceholder
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

   // page specific data
   const [eventOrg, setEventOrg] = useState(null);
   const [comments, setComments] = useState([]);
   useEffect(() => {
      window.scrollTo(0, 0);
      commentsEndpoints
         .getEventComments(currentEvent.eventID)
         .then((comments) => {
            if (comments) {
               setComments([...comments]);
            }
         });
   }, [currentEvent]);
   return (
      <>
         <Navbar></Navbar>
         <div className={styles.container}>
            <h1 className={styles.header}>{currentEvent.name}</h1>
            <Card cardTitle="Info">
               {/* <p>Affipated RSO: RSO Name</p> */}
               <p>Event Type: {currentEvent.eventType}</p>

               <p>Event Privacy: {currentEvent.privacy}</p>

               <p>Description: {currentEvent.description}</p>

               <p>Contact Info Name: {currentEvent.contactName}</p>
               <p>Contact Email: {currentEvent.contactEmail}</p>
               <p>Contact Phone: {currentEvent.contactNumber}</p>

               <p>Date: {currentEvent.date}</p>
               <p>Time: {currentEvent.time}</p>
            </Card>
            <Card cardTitle="Location">
               <p>Latitude: {currentEvent.latitude}</p>
               <p>Longitude: {currentEvent.longitude}</p>
            </Card>
            <div className={styles.commentSection}>
               <div className={styles.sectionHeader}>
                  <h1 className={styles.sectionHeaderTitle}>Comments</h1>
               </div>
               <form className={styles.commentForm}>
                  <input
                     minLength={1}
                     maxLength={1024}
                     placeholder="Leave a comment..."
                  ></input>

                  <input
                     type="number"
                     min={0}
                     max={5}
                     placeholder="Leave a comment..."
                     className={styles.commentRating}
                  ></input>
               </form>
               <ul className={styles.commentList}>
                  {comments &&
                     comments.map((comment) => (
                        <li className={styles.comment} key={comment.commentID}>
                           <div className={styles.commentAuthor}>
                              User #{comment.userID}
                           </div>
                           <div className={styles.commentText}>
                              {comment.text}
                           </div>
                           <div className={styles.commentRating}>
                              Rating: {comment.rating}/5
                           </div>
                        </li>
                     ))}
               </ul>
            </div>
         </div>
      </>
   );
}
