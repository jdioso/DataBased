import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

export default function Event() {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   return (
      <>
         <Navbar></Navbar>
         <h1 className="heading">Event</h1>;
      </>
   );
}
