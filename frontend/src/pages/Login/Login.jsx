import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from "../Firebase/firebase.init";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const provider = new GoogleAuthProvider();

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setError('Both fields are required');
      toast.error('Both fields are required');
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      toast.success(`✅ Logged in as ${user.displayName || user.email}`);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
      toast.error(`❌ ${err.message}`);
    }

    form.reset();
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`✅ Logged in as ${user.displayName}`);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleResetPassword = async () => {
    const email = prompt('Please enter your email for password reset:');
    if (!email) {
      toast.error('Email is required for password reset');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('📧 Password reset email sent!');
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#00bf63]">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
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

          <div className="text-right">
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="btn w-full bg-[#00bf63] text-white hover:bg-green-600"
          >
            Login
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn w-full flex items-center justify-center gap-2 border border-gray-300"
        >
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Login;