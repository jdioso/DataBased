import React, { useState } from "react";
import styles from "./Login.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";
import { useSessionStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import * as userEndpoints from "../../utils/UserEndpoints";
import Button from "../../components/Button/Button";

const initialFormData = {
   email: "",
   password: "",
};

export default function Login() {
   const [formData, setFormData] = useState(initialFormData);
   const [currentUser, setCurrentUser] = useSessionStorage(
      "currentUser",
      1
   ); 
   const [errors, setErrors] = useState({});
   const navigate = useNavigate(); 

   const toggleComponent = () => {
      navigate("/register"); 
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const loginUser = async () => {
      try {
         // Making sure email and password are provided
         if (!formData.email || !formData.password) {
            setErrors({ message: "Please provide both email and password!" });
            return;
         }

        // Calling the login endpoint passing email and password
        const response = await userEndpoints.login(formData.email, formData.password);
        
        // Handling the response
        if (response.success) {
          setCurrentUser(response.user);
          setFormData(initialFormData); 
          setErrors({});
          navigate("/dashboard"); 
        } else {
          setErrors({ message: response.message });
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrors({ message: "An unexpected error occurred" });
   }
}

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
               <Button size="sm" onClick={loginUser}>
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
