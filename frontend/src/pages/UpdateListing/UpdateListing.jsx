import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const UpdateListing = () => {
  const loadedData = useLoaderData();

  console.log("Loaded data:", loadedData);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: loadedData.title || "",
    location: loadedData.location || "",
    rent: loadedData.rent || "",
    roomType: loadedData.roomType || "",
    lifestyle: loadedData.lifestyle || "",
    description: loadedData.description || "",
    contact: loadedData.contact || "",
    availability: loadedData.availability || "",
    gender: loadedData.gender || "",
    age: loadedData.age || "",
    email: loadedData.email || "",
    userName: loadedData.userName || "",
    photoURL: loadedData.photoURL || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateRoomate = (e) => {
    e.preventDefault();

    fetch(
      `https://roommate-finder-server-rouge.vercel.app/roommates/${loadedData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Update Response:", data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You successfully updated the listing",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/");
          });
        } else {
          alert("Update failed. Please check server response.");
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Update Roommate Listing
      </h2>

      <form
        onSubmit={handleUpdateRoomate}
        className="bg-gray-400 shadow-md rounded-lg p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Title", name: "title", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "Rent Amount", name: "rent", type: "number" },
            {
              label: "Lifestyle Preferences",
              name: "lifestyle",
              type: "text",
              span: 2,
            },
            { label: "Contact Info", name: "contact", type: "text" },
            { label: "Age", name: "age", type: "number" },
            { label: "User Email", name: "email", type: "email" },
            { label: "User Name", name: "userName", type: "text" },
            { label: "Photo URL", name: "photoURL", type: "text", span: 2 },
          ].map((field) => (
            <div
              key={field.name}
              className={field.span === 2 ? "md:col-span-2" : ""}
            >
              <label className="block font-medium mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Select inputs */}
          {[
            {
              label: "Room Type",
              name: "roomType",
              options: ["Single", "Shared"],
            },
            {
              label: "Availability",
              name: "availability",
              options: ["Available", "Not Available"],
            },
            {
              label: "Gender",
              name: "gender",
              options: ["Male", "Female"],
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block font-medium mb-1">{field.label}</label>
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Description textarea */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
          >
            Update Listing
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default UpdateListing;
