import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../Pages/Firebase/firebase.init";
import RoommateCard from "../SliderCard/SliderCard";

const Slider = () => {
  const [roommates, setRoommates] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoommates = async () => {
      try {
        const res = await fetch(
          "https://roommate-finder-server-rouge.vercel.app/roommates"
        );
        const data = await res.json();
        const latestNine = data.slice(-9).reverse();
        setRoommates(latestNine);
      } catch (err) {
        console.error("Failed to fetch roommates:", err);
      }
    };

    fetchRoommates();
  }, []);

  const handleSeeMore = (id) => {
    if (!user) {
      toast.warn("Please log in to view roommate details.");
      navigate("/login");
    } else {
      navigate(`/roommate/${id}`);
    }
  };

  const chunkedRoommates = [];
  for (let i = 0; i < roommates.length; i += 3) {
    chunkedRoommates.push(roommates.slice(i, i + 3));
  }

  return (
    <div className="mt-3.5">
      <div className="mt-20">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-2 text-primary">Find Your New Roommate</h2>
          <p>Some amazing people are looking for a roommate like you!</p>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="carousel w-full max-w-6xl rounded-xl">
          {chunkedRoommates.map((group, index) => (
            <div
              id={`slide${index + 1}`}
              key={index}
              className="carousel-item relative w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
                {group.map((roommate) => (
                  <div
                    key={roommate._id}
                    onClick={() => handleSeeMore(roommate._id)}
                    className="cursor-pointer"
                  >
                    <RoommateCard roommate={roommate} />
                  </div>
                ))}
              </div>

              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={`#slide${
                    ((index - 1 + chunkedRoommates.length) %
                      chunkedRoommates.length) +
                    1
                  }`}
                  className="btn btn-circle"
                >
                  ❮
                </a>
                <a
                  href={`#slide${((index + 1) % chunkedRoommates.length) + 1}`}
                  className="btn btn-circle"
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
