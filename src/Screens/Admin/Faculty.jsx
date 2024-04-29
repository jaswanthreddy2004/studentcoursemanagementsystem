import React, { useState } from "react";
import Heading from "../../components/Heading";
import EditFaculty from "./Faculty/EditFaculty";
import AddFaculty from "./Faculty/AddFaculty";

const Faculty = () => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Faculty Details" />
        <div className="flex justify-end items-center w-full gap-4">
          <button
            className={`${
              selected === "add"
                ? "border-b-2 border-green-500 text-green-500"
                : "border-b-0 text-gray-400 hover:text-gray-500 hover:border-b-2"
            } px-4 py-2 rounded-sm`}
            onClick={() => setSelected("add")}
          >
            Add Faculty
          </button>
          <button
className={`${
              selected === "edit"
                ? "border-b-2 border-green-500 text-green-500"
                : "border-b-0 text-gray-400 hover:text-gray-500 hover:border-b-2"
            } px-4 py-2 rounded-sm`}
            onClick={() => setSelected("edit")}
          >
            Edit Faculty
          </button>
        </div>
      </div>
      {selected === "add" && <AddFaculty />}
      {selected === "edit" && <EditFaculty />}
    </div>
  );
};

export default Faculty;