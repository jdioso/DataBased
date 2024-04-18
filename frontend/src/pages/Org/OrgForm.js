import React from "react";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import styles from "./Org.module.css";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

export default function OrgForm() {
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
               <Form formTitle="Create RSO">
                  <Button className={styles.backButton} size="sm">
                     Back
                  </Button>
                  <h2 className={styles.formDescriptor}>Name</h2>
                  <center>
                     <input className={styles.formInput} type="text" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Description</h2>
                  <center>
                     <input className={styles.formInput} type="text" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Primary Owner Email</h2>
                  <center>
                     <input className={styles.formInput} type="email" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Member 1 Email</h2>
                  <center>
                     <input className={styles.formInput} type="email" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Member 2 Email</h2>
                  <center>
                     <input className={styles.formInput} type="email" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Member 3 Email</h2>
                  <center>
                     <input className={styles.formInput} type="email" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Member 4 Email</h2>
                  <center>
                     <input className={styles.formInput} type="email" />
                     <br />
                  </center>
                  <center>
                     <Button size="sm">Submit</Button>
                  </center>
               </Form>
            </div>
         </div>
      </>
   );
}
