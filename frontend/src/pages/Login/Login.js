import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import LoginForm from "../../pages/Login/LoginForm";
import RegisterForm from "../../pages/Register/RegisterForm";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
export default function Login() {
   
   const navigate = useNavigate();

   const openDashboard = async () => {
      navigate("/dashboard");
   };

   const [isLoginForm, setShowLoginForm] = useState(true);

   const toggleComponent = () => {
      setShowLoginForm((prevState) => !prevState);
   };

   const [currentUser, setCurrentUser] = useSessionStorage("currentUser", 1);

   return (
      <>
         <Navbar />
         <div className={styles.container}>
            <div className={styles.flexCol}>
               {isLoginForm ? <LoginForm /> : <RegisterForm />}
               <Button size="sm" onClick={toggleComponent}>
                  {isLoginForm ? "Change to Register" : "Change to Login"}
               </Button>

            </div>
         </div>
      </>
   );
}
