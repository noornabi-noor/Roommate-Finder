import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../Pages/Firebase/firebase.init";

const MyListings = () => {
  const [user, loadingUser, errorUser] = useAuthState(auth);
  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingUser) return;
    if (!user) {
      setListings([]);
      setLoadingListings(false);
      return;
    }

    const fetchMyListings = async () => {
      try {
        const res = await fetch(
          "https://roommate-finder-server-rouge.vercel.app/roommates"
        );
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
        const userListings = data.filter(
          (item) => item.email?.toLowerCase() === user.email?.toLowerCase()
        );
        setListings(userListings);
      } catch (err) {
        toast.error("Failed to fetch your listings.");
      } finally {
        setLoadingListings(false);
      }
    };

    fetchMyListings();
  }, [user, loadingUser]);

  const handleDelete = async (_id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `https://roommate-finder-server-rouge.vercel.app/roommates/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Listing deleted successfully!");
      setListings(listings.filter((item) => item._id !== _id));
    } catch (err) {
      toast.error("Failed to delete listing.");
    }
  };

  if (loadingUser || loadingListings)
    return <p className="text-center p-36 text-2xl font-bold">Loading your listings...</p>;
  if (errorUser)
    return (
      <p className="text-center py-6 text-red-500">
        Error: {errorUser.message}
      </p>
    );
  if (!user)
    return (
      <p className="text-center p-36 text-3xl font-bold">
        Please log in to see your listings.
      </p>
    );
  if (listings.length === 0)
    return (
      <p className="text-center p-60 rounded-2xl text-4xl text-primary font-bold bg-base-200 mt-10 mb-10">
        You haven't added any listings yet.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-10 mt-10 py-16">
      <h2 className="text-3xl text-primary font-bold text-center mb-8">
        My Roommate Listings
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-base-200 text-left">
              <th className="py-3 px-4 border">Title</th>
              <th className="py-3 px-4 border">Location</th>
              <th className="py-3 px-4 border">Rent</th>
              <th className="py-3 px-4 border">Room Type</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id} >
                <td className="py-2 px-4 border">{listing.title}</td>
                <td className="py-2 px-4 border">{listing.location}</td>
                <td className="py-2 px-4 border">${listing.rent}</td>
                <td className="py-2 px-4 border">{listing.roomType}</td>
                <td className="py-2 px-4 border space-x-2">
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="bg-primary hover:bg-blue-700 text-white px-3 py-1 rounded">
                      Update
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="bg-primary hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-6">
        {listings.map((listing) => (
          <div key={listing._id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
            <p>
              <strong>Location:</strong> {listing.location}
            </p>
            <p>
              <strong>Rent:</strong> ${listing.rent}
            </p>
            <p>
              <strong>Room Type:</strong> {listing.roomType}
            </p>
            <div className="mt-4 space-x-2">
              <Link to={`/update-listing/${listing._id}`}>
                <button className="bg-primary hover:bg-blue-700 text-white px-3 py-1 rounded">
                  Update
                </button>
              </Link>

              <button
                onClick={() => handleDelete(listing._id)}
                className="bg-primary hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
