import React from "react";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import styles from "./Login.module.css";
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
               <Form formTitle="Add/Edit Event">
                  <Button className={styles.backButton} size="sm">Back</Button>
                  <h2 className={styles.formDescriptor}>Event Name</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Event Type</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Event Visibility</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Description</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Location</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <center><Button size="sm">Submit</Button></center>
               </Form>
            </div>
         </div>
      </>
   );
}
     