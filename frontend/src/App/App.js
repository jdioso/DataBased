import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/RegisterForm"; 
import Dashboard from "../pages/Dashboard/Dashboard";
import Discover from "../pages/Discover/Discover";
import Event from "../pages/Event/Event";
import Org from "../pages/Org/Org";
import University from "../pages/University/University";
function App() {
   return (
      <div className="App">
         <BrowserRouter primary={false}>
            <Routes>
               <Route path="login" index element={<Login />} />
               <Route path="register" element={<Register />} />
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="discover" element={<Discover />} />
               <Route path="event" element={<Event />} />
               <Route path="org" element={<Org />} />
               <Route path="university" element={<University />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
