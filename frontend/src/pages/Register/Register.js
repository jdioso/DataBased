import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";
import { useSessionStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import * as userEndpoints from "../../utils/UserEndpoints";
import * as adminEndpoints from "../../utils/AdminEndpoints";
import * as uniEndpoints from "../../utils/UniversityEndpoints";

import RegisterForm from "./RegisterForm";

export default function Register() {
   const navigate = useNavigate();
   const [currentUser, setCurrentUser] = useSessionStorage("currentUser", null);

   const getDomain = (email) => {
      const index = email.indexOf("@");
      return email.substring(index);
   };

   const registerUser = async (user) => {
      const requestBody = {
         email: user.email,
         password: user.password,
         firstName: user.firstName,
         lastName: user.lastName,
      };

      // get domain associated with new user's email
      const emailDomain = getDomain(requestBody.email);
      const domainUniversity = await uniEndpoints.getUniversityByDomain(
         emailDomain
      );

      // case for normal user creation
      if (user.userType === "normalUser") {
         if (domainUniversity) {
            const response = await userEndpoints.register(requestBody);

            // checks to see if register request was successful
            if (response.userID) {
               setCurrentUser(response.userID);
               navigate("/dashboard");
            } else {
               window.alert(response.message);
            }
         } else {
            window.alert("No email exists for that email address.");
         }
      }
      // case for super admin creation
      else {
         if (domainUniversity) {
            window.alert(
               "University with that email domain already exists. Choose a different one."
            );
         } else {
            let response = await userEndpoints.register(requestBody);
            const newUserID = response.userID;

            response = await adminEndpoints.addSuperAdmin({
               userID: newUserID,
            });

            const newSaID = response.saID;

            response = await uniEndpoints.addUniversity({
               name: `${user.firstName} ${user.lastName} University`,
               location: "Temporary Address",
               description: "Temporary Description",
               saID: newSaID,
               domain: emailDomain,
               picture: "Temporary Picture",
               numStudents: 1,
            });
            console.log(response);
            setCurrentUser(newUserID);
            navigate("/dashboard");
         }
      }
   };

   return <RegisterForm registerUser={registerUser} />;
}
