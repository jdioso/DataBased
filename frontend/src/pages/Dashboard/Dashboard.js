import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";

export default function Dashboard() {
   const getMyOrgs = async () => {};
   return (
      <>
         <Navbar />
         <div className="container">
            <div className="flex-row">
               <h1 className="subheading flex-grow">University</h1>
               <Button>Open University</Button>
            </div>
            <div className="flex-col">
               <h1 className="subheading">My Organizations</h1>
               <div
                  style={{
                     maxWidth: "100%",
                     display: "flex",
                     flexWrap: "wrap",
                     gap: "30px",
                  }}
               >
                  <Card cardTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Card>
                  <Card cardTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Card>
                  <Card cardTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Card>
                  <Card cardTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Card>
                  <Card cardTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Card>
                  <Card cardTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Card>
                  <Card cardTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Card>
                  <Card cardTitle="Organization Name">
                     <Button size="sm">Open</Button>
                  </Card>
               </div>
            </div>
         </div>
      </>
   );
}
