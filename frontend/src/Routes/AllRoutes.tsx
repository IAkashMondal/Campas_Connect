import { Routes, Route } from "react-router-dom";
import { ChatSection } from "../components/ChatPage/ChatSection";
import Profile from "../components/Profile";
import Login from "../components/Signup-login/Login";
import Signup from "../components/Signup-login/Signup";

const AllRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<ChatSection />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AllRoutes;
