import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";
import { useSessionStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import * as userEndpoints from "../../utils/UserEndpoints";
import * as adminEndpoints from "../../utils/AdminEndpoints"; 
import LoginForm from "./LoginForm"; 

export default function Login() {
   const [currentUser, setCurrentUser] = useSessionStorage(
      "currentUser",
      null
   ); 

   const loginUser = async (user) => {
      const requestBody = {
          email: user.email, 
          password: user.password, 
   };

   if (user.userID) {
      await userEndpoints.register(user.userID, requestBody);
   } else {
      await userEndpoints.register(requestBody);
   }
   };

   return (
      <LoginForm loginUser={loginUser}/>
);
}
