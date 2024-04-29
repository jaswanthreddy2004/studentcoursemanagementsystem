import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Notice from "../../components/Notice";
import Profile from "./Profile";
import Timetable from "./Timetable";
import { Toaster } from "react-hot-toast";
import Material from "./Material";
import Marks from "./Marks";
import Student from "./Student";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  return (
    <section>
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
                label="Student Info"
                selected={selectedMenu === "Student Info"}
                onClick={() => setSelectedMenu("Student Info")}
              />
              <MenuItem
                label="Upload Marks"
                selected={selectedMenu === "Upload Marks"}
                onClick={() => setSelectedMenu("Upload Marks")}
              />
              <MenuItem
                label="Timetable"
                selected={selectedMenu === "Timetable"}
                onClick={() => setSelectedMenu("Timetable")}
              />
              <MenuItem
                label="Notice"
                selected={selectedMenu === "Notice"}
                onClick={() => setSelectedMenu("Notice")}
              />
              <MenuItem
                label="Material"
                selected={selectedMenu === "Material"}
                onClick={() => setSelectedMenu("Material")}
              />
            </ul>
          </div>
          <div className="mx-auto max-w-screen-lg">
            {selectedMenu === "Timetable" && <Timetable />}
            {selectedMenu === "Upload Marks" && <Marks />}
            {selectedMenu === "Material" && <Material />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "My Profile" && <Profile />}
            {selectedMenu === "Student Info" && <Student />}
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
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      } rounded-md`}
      onClick={onClick}
    >
      {label}
    </li>
  );
};

export default Home;
