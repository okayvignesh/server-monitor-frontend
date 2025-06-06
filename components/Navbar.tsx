import { useState } from "react";
import { FaBars, FaTimes, FaBell, FaCog, FaServer } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  return (
    <nav className="w-full backdrop-blur-xl bg-black/20 border-b border-white/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaServer className="w-5 h-5 text-white hover:text-blue-400 transition-colors duration-300" />
            </div>
          </div>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors duration-300 relative">
              <FaBell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors duration-300">
              <FaCog className="w-5 h-5" />
            </button>
          </div> */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* <button className="w-full flex items-center px-3 py-2 text-gray-400 hover:text-white transition-colors duration-300">
              <FaBell className="w-5 h-5 mr-2" />
              Notifications
              {notifications > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="w-full flex items-center px-3 py-2 text-gray-400 hover:text-white transition-colors duration-300">
              <FaCog className="w-5 h-5 mr-2" />
              Settings
            </button> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
