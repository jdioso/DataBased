import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import Square from "../../components/Square/Square";
import styles from "./Dashboard.module.css";
import { useSessionStorage } from "usehooks-ts";
import * as orgEndpoints from "../../utils/OrgEndpoints";
import * as uniEndpoints from "../../utils/UniversityEndpoints";
import * as userEndpoints from "../../utils/UserEndpoints";
import UniversityForm from "../University/UniversityForm";
import OrgForm from "../Org/OrgForm";

export default function Dashboard() {
   const navigate = useNavigate();

   // contains userID for entire site
   // change default value to null later
   const [myUniversity, setMyUniversity] = useSessionStorage(
      "myUniversity",
      null
   );

   const [currentUser, setCurrentUser] = useSessionStorage("currentUser", null);

   // contains data for university page
   const [currentUniversity, setCurrentUniversity] = useSessionStorage(
      "currentUniversity",
      null
   );
   // contains data for org/rso page
   const [currentOrg, setCurrentOrg] = useSessionStorage("currentOrg", null);

   // page specific data
   const [orgs, setOrgs] = useState([]);

   // variables that control forms
   const [openUniForm, setOpenUniForm] = useState(false);
   const [uniRecord, setUniRecord] = useState(null);
   const [openOrgForm, setOpenOrgForm] = useState(false);
   const [orgRecord, setOrgRecord] = useState(null);

   // grabs information of selected university and opens university info page
   const openUniversity = async (university) => {
      setCurrentUniversity({ ...university });
      navigate("/university");
   };

   // grabs information of selected org and opens university info page
   const openOrg = async (org) => {
      setCurrentOrg({ ...org });
      navigate("/org");
   };

   // gets user's email comain
   const getDomain = (email) => {
      const index = email.indexOf("@");
      return email.substring(index);
   };

   // function that returns user's univerisity
   const getUserUniversity = async () => {
      const userInfo = await userEndpoints.getByID(currentUser);

      const userUniversity = await uniEndpoints.getUniversityByDomain(
         getDomain(userInfo.email)
      );
      if (userUniversity) {
         setMyUniversity(userUniversity);
      }
   };

   // function that adds new rso
   const addOrg = async (org, resetForm) => {
      console.log(org);
      const responseBody = {
         // fill with only add rso body
      };

      // checks
      // check if all the members exist
      // if not, send alert that vaguely says check all member emails
      // call request to add new rso
      // use current user id for rso creation
      // individually add all 4 other members to rso
      //
   };

   // function that edits existing rso
   const editOrg = async (org, restForm) => {};

   // function that the RSOs that the user is apart of
   const renderMyOrgs = async () => {
      const orgs = await orgEndpoints.returnMemberRSOs(currentUser);

      if (orgs) {
         setOrgs(orgs);
      } else {
         setOrgs([]);
      }
   };

   useEffect(() => {
      renderMyOrgs();
   }, []);
   return (
      <>
         <Navbar />
         <div className={styles.container}>
            <div className={styles.section}>
               <div className={styles.sectionHeader}>
                  <h1 className={styles.sectionHeaderTitle}>University</h1>
                  <Button
                     onClick={(e) => {
                        e.preventDefault();
                        getUserUniversity();
                        openUniversity();
                     }}
                  >
                     Open University
                  </Button>
                  <Button
                     onClick={(e) => {
                        e.preventDefault();
                        setUniRecord({ ...myUniversity });
                        setOpenUniForm(!openUniForm);
                     }}
                  >
                     {openUniForm ? "Close" : "Edit University"}
                  </Button>
               </div>
               {openUniForm ? <UniversityForm recordForEdit={uniRecord} /> : ""}
            </div>
            <div className={styles.section}>
               <div className={styles.sectionHeader}>
                  <h1 className={styles.sectionHeaderTitle}>
                     My Organizations
                  </h1>
                  <Button
                     onClick={(e) => {
                        e.preventDefault();

                        setOpenOrgForm(!openOrgForm);
                        setOrgRecord({ ...myUniversity });
                     }}
                  >
                     {openOrgForm ? "Close" : "Add Org"}
                  </Button>
               </div>
               {openOrgForm ? <OrgForm /> : ""}

               <div
                  style={{
                     display: "flex",
                     flexWrap: "wrap",
                     gap: "30px",
                  }}
               >
                  {orgs &&
                     orgs.map((org) => (
                        <Square squareTitle={org.name} key={org.rsoID}>
                           <Button
                              size="sm"
                              onClick={(e) => {
                                 e.preventDefault();
                                 openOrg(org);
                              }}
                           >
                              Open
                           </Button>
                           <Button
                              size="sm"
                              onClick={(e) => {
                                 e.preventDefault();
                              }}
                           >
                              Edit
                           </Button>
                        </Square>
                     ))}
               </div>
            </div>
         </div>
      </>
   );
}
