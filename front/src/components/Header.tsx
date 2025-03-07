import React, { useContext, useState } from "react";
import {
  Search,
  Skull,
  MessageSquare,
  Menu,
  ThumbsDown,
  Home,
  Bomb,
  LogOut,
  User,
  PenSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-black border-b border-purple-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
          >
            <Skull className="h-8 w-8 text-purple-500" />
            <span className="ml-2 text-2xl font-bold text-purple-400">
              Asocial
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.div
              className={`flex items-center transition-colors cursor-pointer ${
                location.pathname === "/publications"
                  ? "text-purple-400"
                  : "text-gray-400 hover:text-purple-400"
              }`}
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/publications")}
            >
              <Home className="h-5 w-5" />
              <span className="ml-1">Publications</span>
            </motion.div>
            {!user ? (
              <motion.div
                className={`flex items-center transition-colors cursor-pointer ${
                  location.pathname === "/auth"
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-purple-400"
                }`}
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/auth")}
              >
                <Bomb className="h-5 w-5" />
                <span className="ml-1">Chaos</span>
              </motion.div>
            ) : null}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for chaos..."
                className="w-full bg-gray-900 text-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-800"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="p-2 text-gray-400 hover:text-purple-400 hover:bg-gray-800 rounded-full"
              whileHover={{ scale: 1.1 }}
            >
              <MessageSquare className="h-6 w-6" />
            </motion.button>
            <motion.button
              className="p-2 text-gray-400 hover:text-purple-400 hover:bg-gray-800 rounded-full"
              whileHover={{ scale: 1.1 }}
            >
              <ThumbsDown className="h-6 w-6" />
            </motion.button>

            {user ? (
              <div className="relative">
                <motion.button
                  className={`flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 hover:bg-purple-900 ${
                    location.pathname === "/profile"
                      ? "ring-2 ring-purple-500"
                      : ""
                  }`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <span className="text-sm font-medium text-purple-400">
                    {user?.username?.charAt(0).toUpperCase() || "X"}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-900 border border-purple-900 rounded-lg shadow-lg overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-gray-800">
                        <p className="text-purple-400 font-medium">
                          {user?.username}
                        </p>
                        <p className="text-gray-500 text-sm truncate">
                          {user?.bio}
                        </p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setShowUserMenu(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profil
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Déconnexion
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 hover:bg-purple-900"
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/auth")}
              >
                <span className="text-sm font-medium text-purple-400">X</span>
              </motion.button>
            )}

            <motion.button
              className="md:hidden p-2 text-gray-400 hover:text-purple-400 hover:bg-gray-800 rounded-full"
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800"
          >
            <div className="px-4 py-3">
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search for chaos..."
                  className="w-full bg-gray-800 text-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>

              <nav className="space-y-1">
                <button
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800"
                  onClick={() => {
                    navigate("/publications");
                    setShowMobileMenu(false);
                  }}
                >
                  <Home className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-300">Publications</span>
                </button>

                {user ? (
                  <>
                    <button
                      className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800"
                      onClick={() => {
                        navigate("/profile");
                        setShowMobileMenu(false);
                      }}
                    >
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-300">Profil</span>
                    </button>
                    <button
                      className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800"
                      onClick={() => {
                        handleLogout();
                        setShowMobileMenu(false);
                      }}
                    >
                      <LogOut className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-300">Déconnexion</span>
                    </button>
                  </>
                ) : (
                  <button
                    className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800"
                    onClick={() => {
                      navigate("/auth");
                      setShowMobileMenu(false);
                    }}
                  >
                    <Bomb className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-300">Chaos</span>
                  </button>
                )}

                <button
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800"
                  onClick={() => {
                    navigate("/about");
                    setShowMobileMenu(false);
                  }}
                >
                  <Skull className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-300">À propos</span>
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
