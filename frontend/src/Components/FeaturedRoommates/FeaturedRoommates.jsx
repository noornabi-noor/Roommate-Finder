import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../Pages/Firebase/firebase.init";

const FeaturedRoommates = () => {
  const [roommates, setRoommates] = useState([]);
  const [user, loadingUser] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://roommate-finder-server-rouge.vercel.app/featured-roommates")
      .then((res) => res.json())
      .then((data) => setRoommates(data));
  }, []);

  const handleSeeMore = (id) => {
    if (!user) {
      toast.warn("Please log in to view roommate details.");
      navigate("/login");
    } else {
      console.log(user);
      navigate(`/roommate/${id}`);
    }
  };

  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Featured Roommates
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roommates.map((roommate) => (
          <div key={roommate._id} className="card bg-base-100 shadow-md">
            <figure className="px-6 pt-6">
              <img
                src={roommate.photoURL}
                alt="Roommate"
                className="rounded-xl h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body text-center items-center">
              <h2 className="card-title">{roommate.userName}</h2>
              <p className="text-gray-500">{roommate.location}</p>
              <p>
                {roommate.description?.length > 80
                  ? roommate.description.slice(0, 80) + "..."
                  : roommate.description}
              </p>
              <div className="card-actions justify-center mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSeeMore(roommate._id)}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRoommates;
