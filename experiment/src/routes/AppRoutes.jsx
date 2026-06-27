import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Loading from "../pages/Loading";
import Analysis from "../pages/Analysis";
import ObjectDetails from "../pages/ObjectDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/object/:name" element={<ObjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}