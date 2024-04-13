import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
   const navigate = useNavigate();

   const openDashboard = async () => {
      navigate("/dashboard");
   };

   return (
      <>
         <Navbar />
         <div className={styles.container}>
            <div className={styles.flexRow}>
               if (condition)
               <Form formTitle="Login">
                  <h2 className={styles.formDescriptor}>Username</h2>
                  <center>
                     <input className={styles.formInput} type="text" />
                     <br />
                  </center>
                  <h2 className={styles.formDescriptor}>Password</h2>
                  <center>
                     <input className={styles.formInput} type="password" />
                     <br />
                  </center>
                  <center>
                     <Button size="sm" onClick={openDashboard}>
                        Submit
                     </Button>
                  </center>
               </Form>
               {/* <Form formTitle="Register">
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
               <Form formTitle="Add/Edit Event">
                  <Button className={styles.backButton} size="sm">Back</Button>
                  <h2 className={styles.formDescriptor}>Event Name</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Event Type</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Event Visibility</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Description</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Location</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <center><Button size="sm">Submit</Button></center>
               </Form>
               <Form formTitle="Edit RSO">
                  <Button className={styles.backButton} size="sm">Back</Button>
                  <h2 className={styles.formDescriptor}>Description</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Number of Students</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Location</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <center><Button size="sm">Submit</Button></center>
               </Form>
               <Form formTitle="Create RSO">
                  <Button className={styles.backButton} size="sm">Back</Button>
                  <h2 className={styles.formDescriptor}>Name</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Description</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Primary Owner Email</h2>
                  <center><input className={styles.formInput} type="email" /><br /></center>
                  <h2 className={styles.formDescriptor}>Member 1 Email</h2>
                  <center><input className={styles.formInput} type="email" /><br /></center>
                  <h2 className={styles.formDescriptor}>Member 2 Email</h2>
                  <center><input className={styles.formInput} type="email" /><br /></center>
                  <h2 className={styles.formDescriptor}>Member 3 Email</h2>
                  <center><input className={styles.formInput} type="email" /><br /></center>
                  <h2 className={styles.formDescriptor}>Member 4 Email</h2>
                  <center><input className={styles.formInput} type="email" /><br /></center>
                  <center><Button size="sm">Submit</Button></center>
               </Form>
               <Form formTitle="Edit University">
                  <Button className={styles.backButton} size="sm">Back</Button>
                  <h2 className={styles.formDescriptor}>University Name</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Description</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Number of Students</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <h2 className={styles.formDescriptor}>Location</h2>
                  <center><input className={styles.formInput} type="text" /><br /></center>
                  <button className={styles.uploadPictureButton}>Upload Picture</button>
                  <br/><br/><br/><br/>
                  <center><Button size="sm">Submit</Button></center>
               </Form> */}
            </div>
         </div>
      </>
   );
}
