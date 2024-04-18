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
import OrgForm from "../Org/AddOrgForm";
import AddOrgForm from "../Org/AddOrgForm";

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
      return userUniversity;
   };

   const emailToUserID = async (email) => {
      let user = await userEndpoints.getByEmail(email);

      return user ? user.userID : null;
   };

   // function that adds new rso
   const addOrg = async (orgData, resetForm) => {
      const primMember = await emailToUserID(orgData.primaryEmail);
      const member1 = await emailToUserID(orgData.email1);
      const member2 = await emailToUserID(orgData.email2);
      const member3 = await emailToUserID(orgData.email3);
      const member4 = await emailToUserID(orgData.email4);

      if (primMember && member1 && member2 && member3 && member4) {
         const requestBody = {
            userID: primMember,
            name: orgData.name,
            numMembers: 5,
            description: orgData.description,
         };
         const response = await orgEndpoints.createRSO(requestBody);
         if (!response) {
            window.alert("RSO already exists");
            return;
         }

         const newRSOID = response.rsoID;
         console.log(response);
         await orgEndpoints.addRSOMember(newRSOID, { userID: primMember });
         await orgEndpoints.addRSOMember(newRSOID, { userID: member1 });
         await orgEndpoints.addRSOMember(newRSOID, { userID: member2 });
         await orgEndpoints.addRSOMember(newRSOID, { userID: member3 });
         await orgEndpoints.addRSOMember(newRSOID, { userID: member4 });

         // setOpenOrgForm(false);
         // resetForm();
         renderMyOrgs();
      } else {
         window.alert("One of the emails is not valid.");
      }
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
                        getUserUniversity().then((university) => {
                           setCurrentUniversity(university);
                        });
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
                        setOrgRecord(null);
                     }}
                  >
                     {openOrgForm ? "Close" : "Add Org"}
                  </Button>
               </div>
               {openOrgForm ? <AddOrgForm addOrEdit={addOrg} /> : ""}

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
