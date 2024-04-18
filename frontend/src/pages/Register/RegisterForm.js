import React, { useEffect} from "react";
import Button from "../../components/Button/Button"; 
import Form from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { useForm } from "../../hooks/useForm";

const initialFormData = {
   email: "", 
   password: "", 
   firstName: "", 
   lastName: "", 
};

export default function RegisterForm({ registerUser }) {
   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormData);

   const handleSubmit = () => registerUser(formData, resetForm);

   const navigate = useNavigate();
   
   const toggleComponent = () => {
      navigate("/login"); 
   };

   return (
      <>
         <Navbar></Navbar>
         <div className={styles.container}>
            <div className={styles.flexRow}>
                <Form formTitle="Register">
                    <h2 className={styles.formDescriptor}>First Name</h2>
                    <center>
                        <input 
                            className={styles.formInput}
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        <br />
                    </center>

                    <h2 className={styles.formDescriptor}>Last Name</h2>
                    <center>
                        <input 
                            className={styles.formInput} 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        <br />
                    </center>

                    <h2 className={styles.formDescriptor}>Email</h2>
                    <center>
                        <input 
                            className={styles.formInput} 
                            type="email" 
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

                    <h2 className={styles.formDescriptor}>Account Type</h2><br/>

                    <div>
                        <input 
                            type="radio"
                            id="userChoice1"
                            name="user"
                            value="normalUser"
                            checked={formData.user === "normalUser"}
                            onChange={handleInputChange}
                        />
                        <label for="userChoice1" className={styles.formDescriptor}>Normal User</label>
                        <br/>
                        <br/>
                        <input 
                            type="radio"
                            id="userChoice2" 
                            name="user" 
                            value="universityAdmin" 
                            checked={formData.user === "universityAdmin"}
                            onChange={handleInputChange}
                        />
                        <label for="userChoice2" className={styles.formDescriptor}>University Admin</label>
                    </div>

                    <br/>

                    <center>
                        <Button
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           handleSubmit();
                        }}
                        >
                        Register
                        </Button>
                    </center>
                </Form>

                <div className={styles.flexCol}>
                  <Button size="sm" onClick={toggleComponent}>Change to Login</Button>
                </div>
            </div>
         </div>
      </>
   );
}