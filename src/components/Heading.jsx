

import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="flex justify-between items-center w-full bg-gray-100 py-4 px-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </div>
  );
};

export default Heading;
