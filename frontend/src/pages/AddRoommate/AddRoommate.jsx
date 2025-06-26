import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../Pages/Firebase/firebase.init";

const AddRoommate = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleAddRoommate = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a roommate!");
      return setTimeout(() => navigate("/login"), 2000);
    }

    const form = e.target;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData.entries());

    for (const key in fields) {
      if (!fields[key]) {
        toast.error(`Please fill in the "${key}" field`);
        return;
      }
    }

    if (!email || !userName || !photoURL) {
      toast.error("Please complete your user details!");
      return;
    }

    const newRoommate = {
      ...fields,
      email,
      userName,
      photoURL,
    };

    try {
      const res = await fetch(
        "https://roommate-finder-server-rouge.vercel.app/roommates",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRoommate),
        }
      );

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Roommate added successfully!");
        form.reset();
        setEmail("");
        setUserName("");
        setPhotoURL("");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to add roommate!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Add a Roommate Listing
      </h2>

      <form
        onSubmit={handleAddRoommate}
        className="bg-base-200 shadow-md rounded-lg p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder='e.g., "Looking for a roommate in NYC"'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter city or neighborhood"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Rent Amount */}
          <div>
            <label className="block font-medium mb-1">Rent Amount</label>
            <input
              type="number"
              name="rent"
              placeholder="$500"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block font-medium mb-1">Room Type</label>
            <select
              name="roomType"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Type</option>
              <option value="Single">Single</option>
              <option value="Shared">Shared</option>
            </select>
          </div>

          {/* Lifestyle Preferences */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">
              Lifestyle Preferences
            </label>
            <input
              type="text"
              name="lifestyle"
              placeholder="e.g., Pets allowed, Non-smoker, Night Owl"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe your place and preferences..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Contact Info */}
          <div>
            <label className="block font-medium mb-1">Contact Info</label>
            <input
              type="text"
              name="contact"
              placeholder="Phone or other contact method"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block font-medium mb-1">Availability</label>
            <select
              name="availability"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Put your age e.g., 20 "
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* User Email */}
          <div>
            <label className="block font-medium mb-1">User Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* User Name */}
          <div>
            <label className="block font-medium mb-1">User Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Photo URL */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter your photo URL"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Add Listing
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default AddRoommate;
