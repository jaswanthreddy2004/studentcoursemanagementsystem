import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Notice from "../../components/Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import { baseApiURL } from "../../baseUrl";
import Admin from "./Admin";
import Profile from "./Profile";
import Branch from "./Branch";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Profile");

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  const getStudentCount = useCallback(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/student/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          // Do something with the response if needed
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getFacultyCount = useCallback(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/faculty/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          // Do something with the response if needed
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getStudentCount();
  }, [getStudentCount]);

  useEffect(() => {
    getFacultyCount();
  }, [getFacultyCount]);

  return (
    <>
      {load && (
        <>
          <Navbar />
          <div className="container mx-auto mt-8">
            <ul className="flex justify-center space-x-4">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`text-center py-2 px-4 rounded-lg cursor-pointer
                  ${
                    selectedMenu === item.name
                      ? "bg-blue-500 text-white"
                      : "text-blue-500 hover:bg-blue-100"
                  }`}
                  onClick={() => setSelectedMenu(item.name)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="container mx-auto mt-8">
            {selectedMenu === "Branch" && <Branch />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "Student" && <Student />}
            {selectedMenu === "Faculty" && <Faculty />}
            {selectedMenu === "Subjects" && <Subjects />}
            {selectedMenu === "Admin" && <Admin />}
            {selectedMenu === "Profile" && <Profile />}
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </>
  );
};

const menuItems = [
  { id: 1, name: "Profile", label: "Profile" },
  { id: 2, name: "Student", label: "Student" },
  { id: 3, name: "Faculty", label: "Faculty" },
  { id: 4, name: "Branch", label: "Branch" },
  { id: 5, name: "Notice", label: "Notice" },
  { id: 6, name: "Subjects", label: "Subjects" },
  { id: 7, name: "Admin", label: "Admins" },
];

export default Home;
