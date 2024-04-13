import React, { useEffect } from "react";
import styles from "./Event.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";

export default function Event() {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   return (
      <>
         <Navbar></Navbar>
         <div className={styles.container}>
            <h1 className={styles.header}>Event Name</h1>
            <Card cardTitle="Info">
               <p>Affipated RSO: RSO Name</p>
               <p>Event Type</p>

               <p>Event Privacy</p>

               <p>Description</p>

               <p>Contact Info: </p>

               <p>Date: xx/xx/xxxx / Time: xx:xxPM</p>
            </Card>
            <Card cardTitle="Location">
               <p>Address: 123 Address Drive</p>
            </Card>
            <div className={styles.commentSection}>
               <div className={styles.sectionHeader}>
                  <h1 className={styles.sectionHeaderTitle}>Comments</h1>
               </div>
               <ul className={styles.commentList}>
                  <li className={styles.comment}>
                     <div className={styles.commentAuthor}>Author Name</div>
                     <div className={styles.commentText}>
                        This is the bulk of the text that will make up the
                        comment. It should describe why the event was rated the
                        way it was
                     </div>
                     <div className={styles.commentRating}>Rating: 5/5</div>
                  </li>
                  <li className={styles.comment}>
                     <div className={styles.commentAuthor}>Author Name</div>
                     <div className={styles.commentText}>
                        This is the bulk of the text that will make up the
                        comment. It should describe why the event was rated the
                        way it was
                     </div>
                     <div className={styles.commentRating}>Rating: 5/5</div>
                  </li>
                  <li className={styles.comment}>
                     <div className={styles.commentAuthor}>Author Name</div>
                     <div className={styles.commentText}>
                        This is the bulk of the text that will make up the
                        comment. It should describe why the event was rated the
                        way it was
                     </div>
                     <div className={styles.commentRating}>Rating: 5/5</div>
                  </li>
                  <li className={styles.comment}>
                     <div className={styles.commentAuthor}>Author Name</div>
                     <div className={styles.commentText}>
                        This is the bulk of the text that will make up the
                        comment. It should describe why the event was rated the
                        way it was
                     </div>
                     <div className={styles.commentRating}>Rating: 5/5</div>
                  </li>
                  <li className={styles.comment}>
                     <div className={styles.commentAuthor}>Author Name</div>
                     <div className={styles.commentText}>
                        This is the bulk of the text that will make up the
                        comment. It should describe why the event was rated the
                        way it was
                     </div>
                     <div className={styles.commentRating}>Rating: 5/5</div>
                  </li>
                  <li className={styles.comment}>
                     <div className={styles.commentAuthor}>Author Name</div>
                     <div className={styles.commentText}>
                        This is the bulk of the text that will make up the
                        comment. It should describe why the event was rated the
                        way it was
                     </div>
                     <div className={styles.commentRating}>Rating: 5/5</div>
                  </li>
                  <li className={styles.comment}>
                     <div className={styles.commentAuthor}>Author Name</div>
                     <div className={styles.commentText}>
                        This is the bulk of the text that will make up the
                        comment. It should describe why the event was rated the
                        way it was
                     </div>
                     <div className={styles.commentRating}>Rating: 5/5</div>
                  </li>
               </ul>
            </div>
         </div>
      </>
   );
}
