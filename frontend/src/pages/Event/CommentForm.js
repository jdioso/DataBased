import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import Button from "../../components/Button/Button";
import styles from "./Event.module.css";

const initialFormData = {
   commentID: null,
   text: "",
   rating: 0,
   userID: 0,
   eventID: 0,
};
export default function CommentForm({ recordForEdit, addOrEdit }) {
   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormData);

   useEffect(() => {
      setFormData({ ...recordForEdit });
   }, [recordForEdit]);

   const handleSubmit = () => addOrEdit(formData, resetForm);
   return (
      <form id="commentForm" className={styles.commentForm}>
         <div className={styles.inputGroup}>
            <label>Enter Comment Text</label>
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
            <label>Rating 1-5</label>
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
                  handleSubmit();
               }}
            >
               Submit
            </Button>
         </div>
      </form>
   );
}
