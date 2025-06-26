import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router"; 
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarOpen &&
        !e.target.closest("#sidebar") &&
        !e.target.closest("#sidebar-toggle")
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row relative">
      {/* Mobile Top Bar */}
      <div className="bg-gray-800 text-white flex items-center justify-between px-4 py-3 md:hidden">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <button
          id="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`bg-gray-800 text-gray-500 font-bold w-64 p-4 space-y-4 fixed md:relative z-50 transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0 md:block"
        } md:transform-none md:z-auto md:h-auto`}
      >
        <h2 className="text-xl font-bold mb-4 hidden md:block">Dashboard</h2>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard/overview"
            className={({ isActive }) =>
              `block hover:text-blue-700 ${
                isActive ? "font-bold text-primary underline" : ""
              }`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/dashboard/browse-listing"
            className={({ isActive }) =>
              `block hover:text-blue-700 ${
                isActive ? "font-bold text-primary underline" : ""
              }`
            }
          >
            Browse Listing
          </NavLink>
          <NavLink
            to="/dashboard/my-profile"
            className={({ isActive }) =>
              `block hover:text-blue-700 ${
                isActive ? "font-bold text-primary underline" : ""
              }`
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="/dashboard/my-listings"
            className={({ isActive }) =>
              `block hover:text-blue-700 ${
                isActive ? "font-bold text-primary underline" : ""
              }`
            }
          >
            My Listings
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-base-200 z-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
