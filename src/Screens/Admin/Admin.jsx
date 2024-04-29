import React, { useState } from "react";
import Heading from "../../components/Heading";
import EditAdmin from "./Admin/EditAdmin";
import AddAdmin from "./Admin/AddAdmin";

const Admin = () => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Admin Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            } px-4 py-2 rounded-sm mr-6 transition duration-300 ease-in-out hover:bg-blue-600`}
            onClick={() => setSelected("add")}
          >
            Add Admin
          </button>
          <button
            className={`${
              selected === "edit"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            } px-4 py-2 rounded-sm transition duration-300 ease-in-out hover:bg-blue-600`}
            onClick={() => setSelected("edit")}
          >
            Edit Admin
          </button>
        </div>
      </div>
      <div className="mt-8">
        {selected === "add" && <AddAdmin />}
        {selected === "edit" && <EditAdmin />}
      </div>
    </div>
  );
};

export default Admin;
