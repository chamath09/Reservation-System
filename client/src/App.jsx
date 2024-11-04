import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Exam from "./components/pages/Exam";
import Calender from "./components/pages/Calender";
import Time from "./components/pages/Time";
import Login from "./components/autrhentication/LOgin";
import Nav from "./components/navbar/Nav"; // Adjust the path as necessary
import Register from "./components/autrhentication/Register";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Notice from "./components/pages/Notice"; // Import the Notice component
import Notification from "./components/pages/Notification";

function App() {
  const location = useLocation();
  
  const showNav = location.pathname !== "/" && location.pathname !== "/register";
  
  return (
    <>
      {showNav && <Nav />} 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/time" element={<Time />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
