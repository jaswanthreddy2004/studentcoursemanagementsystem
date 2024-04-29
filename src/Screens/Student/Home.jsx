import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Marks from "./Marks";
import Notice from "../../components/Notice";
import Material from "./Material";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  return (
    <section className="min-h-screen bg-gray-100">
      {load && (
        <>
          <Navbar />
          <div className="flex justify-center my-8">
            <ul className="flex justify-center items-center gap-4">
              <MenuItem
                label="My Profile"
                selected={selectedMenu === "My Profile"}
                onClick={() => setSelectedMenu("My Profile")}
              />
              <MenuItem
                label="Timetable"
                selected={selectedMenu === "Timetable"}
                onClick={() => setSelectedMenu("Timetable")}
              />
              <MenuItem
                label="Marks"
                selected={selectedMenu === "Marks"}
                onClick={() => setSelectedMenu("Marks")}
              />
              <MenuItem
                label="Material"
                selected={selectedMenu === "Material"}
                onClick={() => setSelectedMenu("Material")}
              />
              <MenuItem
                label="Notice"
                selected={selectedMenu === "Notice"}
                onClick={() => setSelectedMenu("Notice")}
              />
            </ul>
          </div>
          <div className="mx-auto max-w-screen-lg">
            {selectedMenu === "Timetable" && <Timetable />}
            {selectedMenu === "Marks" && <Marks />}
            {selectedMenu === "Material" && <Material />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "My Profile" && <Profile />}
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

const MenuItem = ({ label, selected, onClick }) => {
  return (
    <li
      className={`px-4 py-2 cursor-pointer transition-colors ${
        selected
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
      } rounded-md`}
      onClick={onClick}
    >
      {label}
    </li>
  );
};

export default Home;
