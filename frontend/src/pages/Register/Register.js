import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";
import { useSessionStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import * as userEndpoints from "../../utils/UserEndpoints";
import * as adminEndpoints from "../../utils/AdminEndpoints"; 
import RegisterForm from "./RegisterForm"; 

export default function Register() {   
   const [currentUser, setCurrentUser] = useSessionStorage(
      "currentUser",
      null
   ); 

   const registerUser = async (user) => {
    const requestBody = {
        email: user.email, 
        password: user.password, 
        firstName: user.firstName, 
        lastName: user.lastName, 
    };

    if (user.userID) {
       await userEndpoints.register(user.userID, requestBody);
    } else {
       await userEndpoints.register(requestBody);
    }
 };

   return (
    <RegisterForm
     registerUser={registerUser}/>
   );

}; 