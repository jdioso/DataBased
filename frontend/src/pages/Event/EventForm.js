import React, { useEffect } from "react";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import styles from "./Event.module.css";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { useForm } from "../../hooks/useForm";

const initialFormData = {
   eventID: -1,
   eventType: "",
   privacy: "",
   name: "",
   description: "",
   latitude: "",
   longitude: "",
   contactName: "",
   contactEmail: "",
   contactNumber: "",
   time: "",
   date: "",
   universityID: -1,
   rsoID: null,
   approved: false,
};

export default function EventForm({ recordForEdit, addOrEdit }) {
   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormData);

   // function that handles submitting form
   const handleSubmit = () => addOrEdit(formData, resetForm);

   useEffect(() => {
      setFormData({ ...recordForEdit });
   }, [recordForEdit]);

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
                  <h2 className={styles.formDescriptor}>Event Type</h2>
                  <center>
                     <input
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                  </center>
                  <h2 className={styles.formDescriptor}>Event Privacy</h2>
                  <center>
                     <input
                        id="privacy"
                        name="privacy"
                        value={formData.privacy}
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
                  <h2 className={styles.formDescriptor}>Latitude</h2>
                  <center>
                     <input
                        id="latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Longitude</h2>
                  <center>
                     <input
                        id="longitude"
                        name="longitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Contact Name</h2>
                  <center>
                     <input
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Contact Email</h2>
                  <center>
                     <input
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Contact Number</h2>
                  <center>
                     <input
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Date</h2>
                  <center>
                     <input
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Time</h2>
                  <center>
                     <input
                        id="time"
                        name="time"
                        value={formData.time}
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
