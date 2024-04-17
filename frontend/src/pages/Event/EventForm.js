import React from "react";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import styles from "./Event.module.css";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { useForm } from "../../hooks/useForm";

const initialFormData = {
   commentID: null,
   text: "",
   rating: 0,
   userID: 0,
   eventID: 0,
};

export default function EventForm({ closeForm }) {
   const navigate = useNavigate();

   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormData);

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
                  <Button className={styles.backButton} size="sm">
                     Back
                  </Button>
                  <h2 className={styles.formDescriptor}>Event Name</h2>
                  <center>
                     <input className={styles.formInput} type="text" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Event Type</h2>
                  <center>
                     <input className={styles.formInput} type="text" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Event Visibility</h2>
                  <center>
                     <input className={styles.formInput} type="text" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Description</h2>
                  <center>
                     <input className={styles.formInput} type="text" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Location</h2>
                  <center>
                     <input className={styles.formInput} type="text" />
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
