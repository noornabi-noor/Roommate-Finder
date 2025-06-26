import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photo.value;

    if (!photoURL.startsWith('http')) {
      const msg = 'Please provide a valid image URL starting with http or https';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 6) {
      const msg = 'Password must be at least 6 characters';
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      const msg = 'Password must contain at least one uppercase letter';
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!/[a-z]/.test(password)) {
      const msg = 'Password must contain at least one lowercase letter';
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success(`✅ Registered successfully as ${name}`);

      setTimeout(() => {
        navigate('/');
      }, 1000);

      form.reset();
    } catch (err) {
      console.error('Registration error:', err.message);
      setError(err.message);
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        toast.success(`✅ Signed in as ${user.displayName}`);
        setTimeout(() => {
          navigate('/');
        }, 1000);
        setError('');
      })
      .catch((error) => {
        setError(error.message);
        toast.error(`❌ ${error.message}`);
      });
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#00bf63]">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="photo"
            placeholder="Profile Image URL"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="btn w-full bg-[#00bf63] text-white hover:bg-green-600"
          >
            Register
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn w-full flex items-center justify-center gap-2 border border-gray-300"
        >
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>

        <p className="text-sm text-center mt-4 ">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>

  );
};

export default Register;