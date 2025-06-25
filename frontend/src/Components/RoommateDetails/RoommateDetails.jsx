import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaPhoneAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { auth } from "../../pages/Firebase/firebase.init";

const RoommateDetails = () => {
  const { id } = useParams();
  const [user, loadingUser] = useAuthState(auth);
  const [roommate, setRoommate] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    fetch(`https://roommate-finder-server-rouge.vercel.app/roommates/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRoommate(data);
        const storedLikes = localStorage.getItem(`likes-${id}`);
        setLikeCount(storedLikes ? parseInt(storedLikes) : 0);

        if (user && user.email) {
          const likedUsersStr =
            localStorage.getItem(`likedUsers-${id}`) || "[]";
          const likedUsers = JSON.parse(likedUsersStr);

          setUserLiked(likedUsers.includes(user.email));
        } else {
          setUserLiked(false);
        }
      });
  }, [id, user]);

  const handleLike = () => {
    if (!user) {
      alert("Please login to like this post.");
      return;
    }

    if (user.email === roommate?.email) {
      alert("You can't like your own post.");
      return;
    }
    const newLikeCount = likeCount + 1;
    setLikeCount(newLikeCount);
    localStorage.setItem(`likes-${id}`, newLikeCount);

    const likedUsersStr = localStorage.getItem(`likedUsers-${id}`) || "[]";
    const likedUsers = JSON.parse(likedUsersStr);

    if (!likedUsers.includes(user.email)) {
      likedUsers.push(user.email);
      localStorage.setItem(`likedUsers-${id}`, JSON.stringify(likedUsers));
      setUserLiked(true);
    }
  };

  if (!roommate || loadingUser) {
    return (
      <div className="text-center p-36 text-3xl text-black font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 shadow-lg bg-white rounded-xl">
      <img
        src={roommate.photoURL}
        alt="Roommate"
        className="w-full object-cover rounded-lg"
      />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mt-4">{roommate.userName}</h2>
        <p className="text-xl font-semibold text-black mt-4">
          {likeCount} people interested in
        </p>
      </div>

      <p className="text-gray-600">{roommate.location}</p>
      <p className="mt-2">{roommate.description}</p>
      <p className="mt-1 font-semibold">Lifestyle: {roommate.lifestyle}</p>
      <p className="mt-1 font-semibold">Rent: {roommate.rent} per month</p>
      <p className="mt-1 font-semibold">Age: {roommate.age}</p>
      <p className="mt-1 font-semibold">Gender: {roommate.gender}</p>
      <p className="mt-1 font-semibold">
        Availability: {roommate.availability}
      </p>

      {user && (
        <button
          onClick={handleLike}
          disabled={user.email === roommate.email}
          className={`mt-5 px-5 py-2 font-semibold rounded transition ${
            user.email === roommate.email
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-900 text-white"
          }`}
        >
          👍 Like
        </button>
      )}

      {userLiked && (
        <p className="mt-4 font-medium text-gray-800 flex items-center gap-2">
          <FaPhoneAlt /> Contact Number: {roommate.contact || "Not Provided"}
        </p>
      )}
    </div>
  );
};

export default RoommateDetails;
