import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

export default function Event() {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   return (
      <>
         <Navbar></Navbar>
         {/* forms */}
         <h1 className="heading">Login</h1>;
      </>
   );
}
