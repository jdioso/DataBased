import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Discover from "../pages/Discover/Discover";
import Event from "../pages/Event/Event";
import Org from "../pages/Org/Org";
import University from "../pages/University/University";
function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route index element={<Dashboard />} />
            <Route path="discover" element={<Discover />} />
            <Route path="event" element={<Event />} />
            <Route path="org" element={<Org />} />
            <Route path="university" element={<University />} />
            <Route path="login" element={<Login />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
