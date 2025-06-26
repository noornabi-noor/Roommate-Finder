import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../Pages/Firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const Overview = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingUser) return;

    const fetchDashboardOverview = async () => {
      try {
        const res = await axios.get("http://localhost:5000/dashboard-overview", {
          params: { email: user?.email }, // Optional: per-user filtering
        });
        setData(res.data);
      } catch (err) {
        toast.error("Failed to load dashboard overview");
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardOverview();
  }, [user, loadingUser]);

  if (loading || !data) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-gray-800">Total Roommates</h2>
          <p className="text-3xl font-bold text-gray-800">{data.totalRoommates}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-gray-800">Available Roommates</h2>
          <p className="text-3xl font-bold text-gray-800">{data.availableRoommates}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-gray-800">Your Listings</h2>
          <p className="text-3xl font-bold text-gray-800">{data.myListingsCount}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-gray-800">Account Status</h2>
          <p
            className={`text-3xl font-bold ${
              data.accountStatus === "Active" ? "text-green-500" : "text-red-500"
            }`}
          >
            {data.accountStatus}
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
        <ul className="list-disc ml-5 space-y-1 text-gray-700">
          {data.recentActivity.map((item, index) => (
            <li key={index}> {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
