import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase.init';
import { signOut, updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || '');
        setPhotoURL(currentUser.photoURL || '');
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('✅ Logged out successfully');
      navigate('/login');
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      const updatedUser = auth.currentUser;
      setUser({ ...updatedUser });
      toast.success('✅ Profile updated successfully');
      setEditMode(false);
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-gray-300 shadow-lg rounded-xl p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#00bf63] mb-4">My Profile</h2>

        {user ? (
          <>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full mb-4 border border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            {editMode ? (
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter new name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter new photo URL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
                <button
                  onClick={handleProfileUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 "
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="text-sm text-gray-500 mt-1 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p className="text-lg">
                  <strong>Name:</strong> {user.displayName || 'No display name'}
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Last Login:</strong> {user.metadata.lastSignInTime}
                </p>
              </>
            )}

            <div className='flex justify-between'>
                <button
                    onClick={() => setEditMode(true)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                    Edit Profile
                </button>

                <button
                    onClick={handleLogout}
                    className="mt-6 btn bg-red-500 text-white hover:bg-red-600"
                    >
                    Logout
                </button>

            </div>

          </>
        ) : (
          <p>Loading user info...</p>
        )}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
};

export default MyProfile;
