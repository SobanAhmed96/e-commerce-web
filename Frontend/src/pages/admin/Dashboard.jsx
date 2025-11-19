import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, Home, ShoppingBag, Users, Settings } from "lucide-react";
import Navigation from "./Navigation";
import CheckAllowAdmin from "./CheckAllowAdmin";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <CheckAllowAdmin />
      <div
        className={`${
          isOpen ? "w-64" : "w-15"
        } bg-blue-500 text-white flex flex-col transition-all duration-300`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-500">
          <h1
            className={`text-xl font-bold font-serif transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            My Dashboard
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation */}
       {isOpen ? 
        <Navigation />
        : ""
       }

        {/* Footer */}
        <div className="p-4 text-center text-sm border-t border-blue-500">
          {isOpen && <p>© 2025 My Dashboard</p>}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center p-4 bg-white shadow">
          <h2 className="text-2xl font-semibold text-gray-800 font-serif">
            Dashboard
          </h2>
        </div>

        {/* Outlet renders nested route components */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
