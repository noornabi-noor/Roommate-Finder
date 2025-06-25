import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../pages/Firebase/firebase.init";

import { toast } from "react-toastify";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const location = useLocation();

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("✅ Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  const menuItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-green-600 underline" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/browse-listing"
          className={({ isActive }) =>
            isActive ? "font-bold text-green-600 underline" : ""
          }
        >
          Browse Listings
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/find-roommate"
          className={({ isActive }) =>
            isActive ? "font-bold text-green-600 underline" : ""
          }
        >
          Find Roommate
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/my-listings"
          className={({ isActive }) =>
            isActive ? "font-bold text-green-600 underline" : ""
          }
        >
          My Listings
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/my-profile"
            className={({ isActive }) =>
              isActive ? "font-bold text-green-600 underline" : ""
            }
          >
            My Profile
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-200 px-4 shadow-md gap-3">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
            {!user ? (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        <div className="object-contain lg:hidden">
          <div
            style={{
              position: "relative",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-orange-400 font-bold text-3xl">
              ^
            </div>

            <div className="font-bold text-3xl text-orange-400">OO</div>
            <svg
              width="60"
              height="20"
              style={{
                position: "absolute",
                top: "25px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <path
                d="M10 10 C 20 20, 40 20, 50 10"
                stroke="orange"
                strokeWidth="2"
                fill="transparent"
                markerEnd="url(#arrowhead)"
              />
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 Z" fill="orange" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        <NavLink to="/" className="btn btn-ghost text-xl hidden lg:flex">
          <span className="text-[#0c0a05] font-bold text-3xl ">
            r
            <div
              style={{
                position: "relative",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-orange-400">
                ^
              </div>

              <div className="font-bold text-3xl text-orange-400">OO</div>
              <svg
                width="60"
                height="20"
                style={{
                  position: "absolute",
                  top: "25px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <path
                  d="M10 10 C 20 20, 40 20, 50 10"
                  stroke="orange"
                  strokeWidth="2"
                  fill="transparent"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L6,3 Z" fill="orange" />
                  </marker>
                </defs>
              </svg>
            </div>
            mmate
            <span className="text-3xl text-orange-500 font-bold">.com</span>
          </span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{menuItems}</ul>
      </div>

      <div className="navbar-end gap-2">
        {!user ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "font-bold text-green-600 underline" : ""
            }
          >
            <h4 className="text-sm sm:text-base font-semibold">Login</h4>
          </NavLink>
        ) : (
          <>
            <div className="relative group mr-5">
              <div className="avatar w-8 sm:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName || "User Avatar"}
                  className="rounded-full"
                />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                {user.displayName || "No Name"}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="text-sm sm:text-base font-semibold hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="p-2 md:p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        {theme === "dark" ? (
          <span className="text-yellow-300 text-lg md:text-xl">☀️</span>
        ) : (
          <span className="text-gray-700 text-lg md:text-xl">🌙</span>
        )}
      </button>
    </div>
  );
};

export default Navbar;
