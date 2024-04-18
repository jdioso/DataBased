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
   firstName: "", 
   lastName: "", 
};

export default function LoginForm({ loginUser }) {
   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormData);

   const handleSubmit = () => loginUser(formData, resetForm);

   const navigate = useNavigate();

   const toggleComponent = () => {
      navigate("/register"); 
   };

   return (
      <>
         <Navbar></Navbar>
         <div className={styles.container}>
         <Form formTitle="Login">
            <h2 className={styles.formDescriptor}>Email</h2>
            <center>
               <input 
                  className={styles.formInput}
                  type="text" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange}
               />
                <br />
             </center>

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
