import React from "react";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import styles from "./University.module.css";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

export default function Login() {
   const navigate = useNavigate();

   const openDashboard = async () => {
      navigate("/dashboard");
   };

   const [userID, setUserID] = useSessionStorage("userID", null);
   // function that handles login
   // also saves userid to session storage

   return (
      <>
         <div className={styles.container}>
            <div className={styles.flexRow}>
               <Form formTitle="Edit University">
                  <Button className={styles.backButton} size="sm">Back</Button>
                  <h2 className={styles.formDescriptor}>University Name</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Description</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Number of Students</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Location</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <button className={styles.uploadPictureButton}>Upload Picture</button>
                  <br/><br/><br/><br/>
                  <center><Button size="sm">Submit</Button></center>
               </Form>
            </div>
         </div>
      </>
   );
}
