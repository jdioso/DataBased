import React, { useState } from "react";
import styles from "./Register.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";
import { useSessionStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import * as userEndpoints from "../../utils/UserEndpoints";
import * as adminEndpoints from "../../utils/AdminEndpoints"; 
import Button from "../../components/Button/Button";

const initialFormData = {
   email: "", 
   password: "", 
   firstName: "", 
   lastName: "", 
 };

export default function Register() {
   const [formData, setFormData] = useState(initialFormData);
   const [currentUser, setCurrentUser] = useSessionStorage(
      "currentUser",
      1
   ); 
   const [errors, setErrors] = useState({});
   const navigate = useNavigate(); 

   const toggleComponent = () => {
    navigate("/login"); 
    };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
   };

   const registerUser = async () => {
      try {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
          setErrors({ message: "Please fill in all required fields!" });
          return;
        }

        let response; 

        if (formData.user === "normalUser") {
            response = await userEndpoints.register(formData.email, formData.password, formData.firstName, formData.lastName); 
        } else if (formData.user === "universityAdmin") {
            response = await adminEndpoints.addAdmin(formData); 
        } 
        
        if (response.success) {
          setCurrentUser(response.user);
          setFormData(initialFormData); 
          setErrors({});
          navigate("/dashboard"); 
        } else {
          setErrors({ message: response.message });
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setErrors({ message: "An unexpected error occurred"});
   }
}

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
                        <Button size="sm" onClick={registerUser}>
                            Register
                        </Button>
                        {errors.message && <p>{errors.message}</p>}
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