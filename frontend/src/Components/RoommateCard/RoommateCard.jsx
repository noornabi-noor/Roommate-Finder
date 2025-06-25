import React from 'react';
import { Link } from 'react-router-dom';

const RoommateCard = ({ roommate }) => {
  const { _id, title, photoURL, userName, age, gender, description, location } = roommate;

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-md hover:shadow-lg transition">
      <figure className="px-10 pt-10">
        <Link to={`/roommate/${_id}`}>
          <img
            src={photoURL || "/default-avatar.png"}
            alt="Roommate"
            className="rounded-full h-36 w-36 object-cover cursor-pointer hover:opacity-80 transition"
          />
        </Link>
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title">{userName}</h2>
        <div className="flex gap-2.5 font-semibold text-sm sm:text-base">
          <h5>{gender}</h5>
          <span>|</span>
          <h5>{age}</h5>
        </div>
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Title:</span> {title}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Looking at:</span> {location}
        </p>
        <p className="text-sm sm:text-base">
          {description.length > 100 ? `${description.slice(0, 100)}...` : description}
        </p>

        <div className="card-actions mt-3">
          <Link to={`/roommate/${_id}`}>
            <button className="btn btn-primary btn-sm sm:btn-md">See More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoommateCard;