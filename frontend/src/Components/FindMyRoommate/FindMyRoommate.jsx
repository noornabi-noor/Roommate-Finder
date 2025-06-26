import React from 'react';
import { Link } from 'react-router-dom';
import community from '../../assets/communitycoliving.svg';

const FindMyRoommate = () => {
  return (
    <div>
      <div className='p-12 mt-5 rounded-2xl bg-base-200 shadow-md text-center'>
        <h1 className='text-3xl font-bold text-primary '>Finding a great roommate should be hassle free.</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-5 p-6 md:p-10 rounded-2xl bg-base-200 shadow-md items-center">
        <div className="flex flex-col justify-center text-center md:text-left max-w-xl">
          <h1 className="font-bold text-2xl md:text-3xl text-primary">
            List your roommate with FindMyRoommate
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-500">
            Convert your vacant space into revenue generating asset. Get the space listed and obtain visibility from lakhs of users who are looking for a space in Top Cities of Bangladesh.
          </p>
          <div className="mt-4">
            <Link to="/find-roommate">
              <button className="btn btn-primary hover:bg-blue-700">List Your Space</button>
            </Link>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:ml-10">
          <img className="w-full max-w-sm md:max-w-md lg:max-w-lg" src={community} alt="Community Party" />
        </div>
      </div>
    </div>
  );
};

export default FindMyRoommate;
