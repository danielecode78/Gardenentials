import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/components/authenticate/Login";
import Register from "@/components/authenticate/Register";
import GardensTable from "../pages/GardensTable";
import GardenManager from "../pages/GardenManager";
import WikiGarden from "../pages/WikiGarden";
import Meteo from "../pages/Meteo";

export default function GardenRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/gardens" element={<GardensTable />} />
      <Route path="/garden-manager/:id" element={<GardenManager />} />
      <Route path="/wiki-garden" element={<WikiGarden />} />
      <Route path="/meteo" element={<Meteo />} />
    </Routes>
  );
}
