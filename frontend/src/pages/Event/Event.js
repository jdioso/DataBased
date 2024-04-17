import React, { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import * as commentsEndpoints from "../../utils/CommentsEndpoints";
import * as orgEndpoints from "../../utils/OrgEndpoints";
import CommentForm from "./CommentForm";
import styles from "./Event.module.css";
import EventForm from "./EventForm";

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
   // contains userID for entire site
   // change default value to null later
   const [myUniversityID, setMyUniversityID] = useSessionStorage(
      "myUniversityID",
      1
   );
   const [currentUser, setCurrentUser] = useSessionStorage("currentUser", 2);

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
   const [eventOrg, setEventOrg] = useState(null);
   const [comments, setComments] = useState([]);

   // variables that control forms
   const [openEdit, setOpenEdit] = useState(false);
   const [commentForEdit, setCommentForEdit] = useState(null);
   const [eventForEdit, setEventForEdit] = useState(null);

   // function that checks if current user is an admin of the event's rso
   const canEditEvent = async () => {
      // get list of rso's that the user is an admin for
      const managedRSOs = await orgEndpoints.returnUsersRSOs(currentUser);
      console.log(managedRSOs);

      // check to see if this list includes the current event's rso
      // if so, return true
      // if not return false
      return true;
   };

   const renderComments = async () => {
      const comments = await commentsEndpoints.getEventComments(
         currentEvent.eventID
      );

      if (comments) {
         setComments(comments);
      } else {
         setComments([]);
      }
   };

   // function that highlights an element then unhilights it after 3 seconds
   const highlightCommentForm = () => {
      const commentForm = document.querySelector("#commentForm");
      commentForm.classList.add(styles.highlighted);
      setTimeout(() => {
         commentForm.classList.remove(styles.highlighted);
      }, 1000);
   };
   const addOrEditComment = async (comment, resetForm) => {
      const requestBody = {
         text: comment.text,
         rating: comment.rating,
         userID: currentUser,
         eventID: currentEvent.eventID,
      };

      if (comment.commentID) {
         await commentsEndpoints.editComment(comment.commentID, requestBody);
      } else {
         await commentsEndpoints.addComment(requestBody);
      }
      resetForm();
      renderComments();
   };

   // function that handles deleting comment
   const deleteComment = async (commentID) => {
      const check = window.confirm(
         "Are you sure you want to delete this comment?"
      );
      if (check) {
         await commentsEndpoints.deleteComment(commentID);
      }
      renderComments();
   };

   const addOrEditEvent = async (comment, resetForm) => {
      const requestBody = {
         text: comment.text,
         rating: comment.rating,
         userID: currentUser,
         eventID: currentEvent.eventID,
      };

      if (comment.commentID) {
         await commentsEndpoints.editComment(comment.commentID, requestBody);
      } else {
         await commentsEndpoints.addComment(requestBody);
      }

      if (canEditEvent) {
      }
      // resetForm();
      // setCurrentEvent()
      // renderComments();
   };
   useEffect(() => {
      window.scrollTo(0, 0);
      renderComments();
   }, [currentEvent]);
   return (
      <>
         <Navbar></Navbar>
         <div className={styles.container}>
            <div className={styles.header}>
               <h1>{currentEvent.name}</h1>
               <Button
                  onClick={(e) => {
                     e.preventDefault();
                     setOpenEdit(!openEdit);
                     setEventForEdit({ ...currentEvent });
                  }}
               >
                  {openEdit ? "Close" : "Edit"}
               </Button>
            </div>
            {openEdit ? <EventForm recordForEdit={eventForEdit} /> : ""}

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
               <CommentForm
                  recordForEdit={commentForEdit}
                  addOrEdit={addOrEditComment}
               />
               <ul className={styles.commentList}>
                  {comments &&
                     comments.map((comment) => (
                        <>
                           <li
                              className={styles.comment}
                              key={comment.commentID}
                           >
                              <div className={styles.commentAuthor}>
                                 User #{comment.userID}
                              </div>
                              <div className={styles.commentText}>
                                 {comment.text}
                              </div>
                              <div className={styles.commentRating}>
                                 Rating: {comment.rating}/5
                              </div>
                              {currentUser === comment.userID ? (
                                 <div className={styles.commentControls}>
                                    <Button
                                       onClick={(e) => {
                                          e.preventDefault();
                                          setCommentForEdit({
                                             ...comment,
                                             commentID: comment.commentID,
                                          });
                                          window.location.replace(
                                             "#commentForm"
                                          );
                                          highlightCommentForm();
                                       }}
                                    >
                                       Edit
                                    </Button>
                                    <Button
                                       onClick={(e) => {
                                          e.preventDefault();
                                          deleteComment(comment.commentID);
                                          renderComments();
                                       }}
                                    >
                                       Delete
                                    </Button>
                                 </div>
                              ) : (
                                 ""
                              )}
                           </li>
                        </>
                     ))}
               </ul>
            </div>
         </div>
      </>
   );
}
