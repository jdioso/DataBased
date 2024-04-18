import React, { useEffect } from "react";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import styles from "./University.module.css";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { useForm } from "../../hooks/useForm";

const initialFormData = {
   name: "",
   description: "",
   saID: null,
   domain: "",
   picture: "",
   numStudents: 0,
};
export default function UniversityForm(recordForEdit, addOrEdit) {
   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormData);

   const navigate = useNavigate();

   const [userID, setUserID] = useSessionStorage("userID", null);

   const handleSubmit = () => addOrEdit(formData, resetForm);

   useEffect(() => {
      setFormData(recordForEdit, addOrEdit);
   }, [recordForEdit]);
   return (
      <>
         <div className={styles.container}>
            <div className={styles.flexRow}>
               <Form formTitle="Add/Edit University">
                  <Button className={styles.backButton} size="sm">
                     Back
                  </Button>
                  <h2 className={styles.formDescriptor}>University Name</h2>
                  <center>
                     <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
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
                  </center>
                  <h2 className={styles.formDescriptor}>Number of Students</h2>
                  <center>
                     <input
                        id="numStudents"
                        name="numStudents"
                        value={formData.numStudents}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                  </center>
                  <h2 className={styles.formDescriptor}>Location</h2>
                  <center>
                     <input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Picture Link</h2>
                  <center>
                     <input
                        id="picture"
                        name="picture"
                        value={formData.picture}
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
