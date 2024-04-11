import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Discover from "./pages/Discover/Discover";
import Event from "./pages/Event/Event";
import Info from "./pages/Info/Info";
import Org from "./pages/Org/Org";
import University from "./pages/University/University";
function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/event" element={<Event />} />
            <Route path="/info" element={<Info />} />
            <Route path="/org" element={<Org />} />
            <Route path="/university" element={<University />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </Router>
   );
}

export default App;
