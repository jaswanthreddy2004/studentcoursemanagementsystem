import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.loginid!== "" && data.password!== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
       .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
       .then((response) => {
        localStorage.setItem("id",document.getElementById("loginid").value)
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
       .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url("https://images.static-collegedunia.com/public/college_data/images/campusimage/1579069989About%20us%20-1.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/college-54-458375.png"
            alt="College Logo"
            className="w-16 h-16"
          />
          <h2 className="text-3xl font-semibold text-center ml-4">
            {selected} Login
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="loginid" className="block mb-2">
              {selected} Login ID
            </label>
            <input
              type="number"
              id="loginid"
              className="w-full py-2 px-4 rounded border-gray-300 focus:outline-none focus:border-blue-500"
              {...register("loginid", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full py-2 px-4 rounded border-gray-300 focus:outline-none focus:border-blue-500"
              {...register("password", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center"
          >
            Login <FiLogIn className="ml-2" />
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="mr-4">
            <button
              className={`text-green-500 font-semibold hover:text-green-700 focus:outline-none ${
                selected === "Student"? "underline" : ""
              }`}
              onClick={() => setSelected("Student")}
            >
              Student
            </button>
          </span><span className="mr-4">
            <button
              className={`text-green-500 font-semibold hover:text-green-700 focus:outline-none ${
                selected === "Faculty"? "underline" : ""
              }`}
              onClick={() => setSelected("Faculty")}
            >
              Faculty
            </button>
          </span>
          <span>
            <button
              className={`text-green-500 font-semibold hover:text-green-700 focus:outline-none ${
                selected === "Admin"? "underline" : ""
              }`}
              onClick={() => setSelected("Admin")}
            >
              Admin
            </button>
          </span>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;