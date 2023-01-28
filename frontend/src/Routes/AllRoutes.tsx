import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AllRoutes;
