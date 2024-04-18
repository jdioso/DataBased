import React from "react";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import styles from "./Org.module.css";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { useForm } from "../../hooks/useForm";

const initialFormData = {
   name: "",
   description: "",
   primaryEmail: "",
   email1: "",
   email2: "",
   email3: "",
   email4: "",
};
export default function AddOrgForm({ addOrEdit }) {
   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormData);

   const [userID, setUserID] = useSessionStorage("userID", null);
   // function that handles login
   // also saves userid to session storage

   const handleSubmit = () => addOrEdit(formData, resetForm);

   return (
      <>
         <div>
            <div className={styles.flexRow}>
               <Form formTitle="Create RSO">
                  <h2 className={styles.formDescriptor}>Name</h2>
                  <center>
                     <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Description</h2>
                  <center>
                     <input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Primary Owner Email</h2>
                  <center>
                     <input
                        id="primaryEmail"
                        name="primaryEmail"
                        value={formData.primaryEmail}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Member 1 Email</h2>
                  <center>
                     <input
                        id="email1"
                        name="email1"
                        value={formData.email1}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Member 2 Email</h2>
                  <center>
                     <input
                        id="email2"
                        name="email2"
                        value={formData.email2}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Member 3 Email</h2>
                  <center>
                     <input
                        id="email3"
                        name="email3"
                        value={formData.email3}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Member 4 Email</h2>
                  <center>
                     <input
                        id="email4"
                        name="email4"
                        value={formData.email4}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <center>
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           handleSubmit();
                        }}
                     >
                        Submit
                     </Button>
                  </center>
               </Form>
            </div>
         </div>
      </>
   );
}
