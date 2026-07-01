import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Loading from "../pages/Loading";
import Analysis from "../pages/Analysis";
import ObjectDetails from "../pages/ObjectDetails";
import Compare from "../pages/Compare";
import Timeline from "../pages/Timeline";
import History from "../pages/History";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/intro" element={<Home />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/object/:name" element={<ObjectDetails />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/compare/:objectA/:objectB" element={<Compare />} />
        <Route path="/timeline/:object" element={<Timeline />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
