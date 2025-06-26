import React from 'react';
import { useLoaderData } from 'react-router-dom';
import RoommateCard from '../../Components/RoommateCard/RoommateCard';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Pages/Firebase/firebase.init';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BrowseListing = () => {
  const roommates = useLoaderData();

  const [user, loadingUser] = useAuthState(auth);
  const navigate = useNavigate();


  const handleSeeMore = (id) => {
      if (!user) {
        toast.warn('Please log in to view roommate details.');
        navigate('/login');
      } else {
        console.log(user);
        navigate(`/roommate/${id}`);
      }
    };

  return (
    <div className="mt-8 px-4 ">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
        {roommates.map(roommate => (
          <RoommateCard key={roommate._id} roommate={roommate} />
        ))}
      </div>

      
      <div className="hidden md:block overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base ">
          <thead>
            <tr className="bg-gray-600">
              <th className="py-3 px-4 border">Photo</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Gender</th>
              <th className="py-3 px-4 border">Age</th>
              <th className="py-3 px-4 border">Title</th>
              <th className="py-3 px-4 border">Location</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {roommates.map((roommate) => (
              <tr key={roommate._id} className="hover:bg-gray-400 transition">
                <td className="py-3 px-4 border text-center">
                  <img
                    src={roommate.photoURL || '/default-avatar.png'}
                    alt="Roommate"
                    className="rounded-full h-10 w-10 object-cover inline-block"
                  />
                </td>
                <td className="py-3 px-4 border text-center">{roommate.userName}</td>
                <td className="py-3 px-4 border text-center">{roommate.gender}</td>
                <td className="py-3 px-4 border text-center">{roommate.age}</td>
                <td className="py-3 px-4 border text-center">{roommate.title}</td>
                <td className="py-3 px-4 border text-center">{roommate.location}</td>
                <td className="py-3 px-4 border text-center">
                  {roommate.description.length > 60
                    ? `${roommate.description.slice(0, 60)}...`
                    : roommate.description}
                </td>

                <td className="py-3 px-4 border text-center">
                    <a
                        onClick={() => handleSeeMore(roommate._id)}
                        className="inline-block bg-primary text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-blue-700 whitespace-nowrap transition cursor-pointer"
                    >
                    See More
                    </a>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseListing;