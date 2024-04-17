import React, { useEffect, useState } from "react";
import styles from "./Event.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";
import { useSessionStorage } from "usehooks-ts";
import * as commentsEndpoints from "../../utils/CommentsEndpoints";
import { useForm } from "../../hooks/useForm";
import Button from "../../components/Button/Button";

const initialFormData = {
   commentID: null,
   text: "",
   rating: 0,
   userID: 0,
   eventID: 0,
};

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
   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormData);

   // contains userID for entire site
   // change default value to null later
   const [myUniversityID, setMyUniversityID] = useSessionStorage(
      "myUniversityID",
      1
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
   const [eventOrg, setEventOrg] = useState(null);
   const [comments, setComments] = useState([]);

   // function that highlights an element then unhilights it after 3 seconds
   const highlightCommentForm = () => {
      const commentForm = document.querySelector("#commentForm");
      commentForm.classList.add(styles.highlighted);
      setTimeout(() => {
         commentForm.classList.remove(styles.highlighted);
      }, 1000);
   };
   const addOrEditComment = async () => {
      const requestBody = {
         text: formData.text,
         rating: formData.rating,
         userID: currentUser,
         eventID: currentEvent.eventID,
      };

      if (formData.commentID) {
         await commentsEndpoints.editComment(formData.commentID, requestBody);
      } else {
         await commentsEndpoints.addComment(requestBody);
      }

      resetForm();
      commentsEndpoints
         .getEventComments(currentEvent.eventID)
         .then((comments) => {
            if (comments) {
               setComments(comments);
            }
         });
   };

   const deleteComment = async (commentID) => {
      const check = window.confirm(
         "Are you sure you want to delete this comment?"
      );
      if (check) {
         await commentsEndpoints.deleteComment(commentID);
      }
      commentsEndpoints
         .getEventComments(currentEvent.eventID)
         .then((comments) => {
            if (comments) {
               setComments(comments);
            }
         });
   };
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
               <form id="commentForm" className={styles.commentForm}>
                  <div className={styles.inputGroup}>
                     <label for="commentText">Enter Comment Text</label>
                     <input
                        id="text"
                        name="text"
                        value={formData.text}
                        minLength={1}
                        maxLength={1024}
                        placeholder="Leave a comment..."
                        onChange={handleInputChange}
                     />
                  </div>

                  <div className={styles.inputGroup}>
                     <label for="rating">Rating 1-5</label>
                     <input
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        type="number"
                        maxLength="1"
                        min="1"
                        max="5"
                        placeholder="Rating..."
                        className={styles.commentRating}
                        onChange={handleInputChange}
                     />
                  </div>
                  <div className={styles.commentFormControls}>
                     <Button
                        type="submit"
                        onClick={(e) => {
                           e.preventDefault();
                           addOrEditComment();
                        }}
                     >
                        Submit
                     </Button>
                  </div>
               </form>
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
                                          setFormData({
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
                                          commentsEndpoints
                                             .getEventComments(
                                                currentEvent.eventID
                                             )
                                             .then((comments) => {
                                                if (comments) {
                                                   setComments([...comments]);
                                                }
                                             });
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
