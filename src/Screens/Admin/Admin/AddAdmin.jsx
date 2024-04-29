import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/config";
import { baseApiURL } from "../../../baseUrl";
import { FiUpload } from "react-icons/fi";


const AddAdmin = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profile: "",
  });

  useEffect(() => {
    const uploadFileToStorage = async (file) => {
      toast.loading("Upload ECV To Storage");
      const storageRef = ref(
        storage,
        `Admin Profile/${data.department}/${data.employeeId}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          toast.dismiss();
          toast.error("Something Went Wrong!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss();
            setFile();
            toast.success("ECV Uploaded To S3");
            setData({ ...data, profile: downloadURL });
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [data, file]);
  const handleFileUpload = async (e) => {
    const files = e.target.files[0];

    if (!files) {
      alert('Please select a file.');
      return;
    }

    const apiUrl = 'https://9h9s7mso7a.execute-api.us-east-1.amazonaws.com/c4/upload';

    try {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const fileContentBase64 = fileReader.result.split(',')[1];

        // Build the request body
        const requestBody = {
          filename: files.name,
          file: fileContentBase64,
        };

        // Make the request using Axios
        axios.post(apiUrl, requestBody)
          .then(response => {
            if (response.status === 200) {
              alert('File uploaded successfully!');
              setData({ profile: fileContentBase64 });
            } else {
              console.error(response);
              alert('Error uploading file.');
            }
          })
          .catch(error => {
            console.error(error);
            alert('An unexpected error occurred.');
          });
      };

      fileReader.readAsDataURL(files);

    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    }
  };
  const addAdminProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Admin");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/admin/details/addDetails`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          axios
            .post(
              `${baseApiURL()}/Admin/auth/register`,
              { loginid: data.employeeId, password: 112233 },
              {
                headers: headers,
              }
            )
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                setFile();
                setData({
                  employeeId: "",
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  gender: "",
                  profile: "",
                });
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.dismiss();
              toast.error(error.response.data.message);
            });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  return (
    <form
      onSubmit={addAdminProfile}
      className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
    >
      <div className="w-[40%]">
        <label htmlFor="firstname" className="leading-7 text-sm ">
          Enter First Name
        </label>
        <input
          type="text"
          id="firstname"
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="middlename" className="leading-7 text-sm ">
          Enter Middle Name
        </label>
        <input
          type="text"
          id="middlename"
          value={data.middleName}
          onChange={(e) => setData({ ...data, middleName: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="lastname" className="leading-7 text-sm ">
          Enter Last Name
        </label>
        <input
          type="text"
          id="lastname"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="employeeId" className="leading-7 text-sm ">
          Enter Employee Id
        </label>
        <input
          type="number"
          id="employeeId"
          value={data.employeeId}
          onChange={(e) => setData({ ...data, employeeId: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="email" className="leading-7 text-sm ">
          Enter Email Address
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="phoneNumber" className="leading-7 text-sm ">
          Enter Phone Number
        </label>
        <input
          type="number"
          id="phoneNumber"
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="gender" className="leading-7 text-sm ">
          Select Gender
        </label>
        <select
          id="gender"
          className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          {" "}
          <option defaultValue>-- Select --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="file" className="leading-7 text-sm ">
          Select ECV
        </label>
        <label
          htmlFor="file"
          className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
        >
          Upload
          <span className="ml-2">
            <FiUpload />
          </span>
        </label>
        <input
          hidden
          type="file"
          id="file"
          accept="image/*,.pdf"
          onChange={(e) => {
            setFile(e.target.files[0]);
            handleFileUpload(e);
          }}
        />
      </div>

     
      {data.profile && (
        <div className="w-full flex justify-center items-center">
          <img src={data.profile} alt="student" className="h-36" />
        </div>
      )}
      <div className="w-[40%]">
      <button
        type="submit"
        className="bg-blue-500 px-6 py-3 rounded-sm my-6 text-white"
      >
        Add New Admin
      </button>
      </div>

    </form>
  );
};

export default AddAdmin;
