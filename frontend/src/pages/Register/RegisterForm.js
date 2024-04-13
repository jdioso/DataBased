import React from "react";
import Button from "../../components/Button/Button"; 
import Form from "../../components/Form/Form";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
   const navigate = useNavigate();

   const openDashboard = async () => {
      navigate("/dashboard");
   };

   return (
      <>
         <div className={styles.container}>
            <div className={styles.flexRow}>
               <Form formTitle="Register">
                  <h2 className={styles.formDescriptor}>First Name</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Last Name</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Email</h2>
                  <center><input className={styles.formInput} type="email" /><br /></center>
                  <h2 className={styles.formDescriptor}>Password</h2>
                  <center><input className={styles.formInput} type="password" /><br /></center>
                  <center><Button size="sm">Register</Button></center>
               </Form>
            </div>
         </div>
      </>
   );
}