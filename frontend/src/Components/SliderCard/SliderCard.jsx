import React from 'react';

const SliderCard = ({ roommate }) => {
  const { photoURL, userName, location } = roommate;
  return (
    <div className="card bg-base-100 w-80 shadow-md">
      <figure className="px-6 pt-6">
        <img
          src={photoURL}
          alt="Roommate"
          className="h-32 w-32 rounded-full object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{userName}</h2>
        <p className="text-gray-500">{location}</p>
      </div>
    </div>
  );
};

export default SliderCard;
