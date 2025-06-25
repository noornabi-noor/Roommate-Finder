import React from 'react';

const SliderCard = ({ roommate }) => {
  const { photoURL, userName, location } = roommate;

  return (
    <div className="card w-80 h-[340px] shadow-md flex flex-col items-center justify-start">
      <figure className="pt-6">
        <img
          src={photoURL}
          alt="Roommate"
          className="h-32 w-32 rounded-full object-cover"
        />
      </figure>
      <div className="card-body items-center text-center p-4">
        <h2 className="card-title text-lg">{userName}</h2>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>
    </div>
  );
};

export default SliderCard;
