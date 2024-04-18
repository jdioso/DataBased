import React, { useEffect} from "react";
import Button from "../../components/Button/Button"; 
import Form from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { useForm } from "../../hooks/useForm";

const initialFormData = {
   email: "",
   password: "",
};

export default function LoginForm({ loginUser }) {
   const navigate = useNavigate();

   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormData);

   // function that handles submitting form
   const handleSubmit = () => loginUser(formData, resetForm);

   return (
      <>
         <Navbar></Navbar>
         <div className={styles.container}>
            <div className={styles.flexRow}>
               <Form formTitle="Login">
                  <h2 className={styles.formDescriptor}>Email</h2>
                  <center>
                     <input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Password</h2>
                  <center>
                     <input
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        type="text"
                     />
                  </center>
                  <center>
                     <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           handleSubmit();
                        }}
                     >
                        Login
                     </Button>
                  </center>
               </Form>

            <h2 className={styles.formDescriptor}>Password</h2>
            <center>
                <input 
                  className={styles.formInput}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
                  Login
               </Button>
               {errors.message && <p>{errors.message}</p>}
            </center>
         </Form>
         <div className={styles.flexCol}>
            <Button size="sm" onClick={toggleComponent}>Change to Register</Button>
         </div>
      </div>
   </>
   );
}
