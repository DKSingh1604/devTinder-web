/* eslint-disable no-unused-vars */
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useEffect, useRef } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownToggleRef = useRef(null);
  // console.log(user);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="navbar bg-transparent shadow-xl backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <Link
            to="/feed"
            className="btn btn-ghost text-xl font-extrabold font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            👨‍💻 Dev Tinder
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden md:flex items-center mr-4">
              <span className="text-white/80 text-sm font-medium">
                Welcome back,{" "}
                <span className="text-purple-300 font-semibold">
                  {user.firstName || user.data?.firstName || "Developer"}
                </span>
              </span>
            </div>
          )}
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-white/10 transition-colors duration-200"
                ref={dropdownToggleRef}
              >
                <div className="w-10 rounded-full ring-2 ring-purple-400/50 ring-offset-2 ring-offset-transparent">
                  <img
                    alt="user photo"
                    src={
                      user.photoUrl ||
                      user.data.photoUrl ||
                      "https://via.placeholder.com/40"
                    }
                    onError={(e) => {
                      e.target.src =
                        "https://imgs.search.brave.com/0w706iazLuiZA7_266Xh7P1rBBHA32banx87yLoT5ZI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY2L2Zm/L2NiLzY2ZmZjYjU2/NDgyYzY0YmRmNmI2/MDEwNjg3OTM4ODM1/LmpwZw";
                    }}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white/95 backdrop-blur-lg rounded-xl z-50 mt-3 w-56 p-2 shadow-2xl border border-white/20"
              >
                <li className="menu-title">
                  <span className="text-gray-600 font-semibold text-sm">
                    Navigation
                  </span>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 rounded-lg"
                    onClick={() => dropdownToggleRef.current?.blur()}
                  >
                    <span className="text-lg">👤</span>
                    <span className="font-medium">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 rounded-lg"
                    onClick={() => dropdownToggleRef.current?.blur()}
                  >
                    <span className="text-lg">🤝</span>
                    <span className="font-medium">Connections</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 rounded-lg"
                    onClick={() => dropdownToggleRef.current?.blur()}
                  >
                    <span className="text-lg">📨</span>
                    <span className="font-medium">Requests</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/feed"
                    className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 rounded-lg"
                    onClick={() => dropdownToggleRef.current?.blur()}
                  >
                    <span className="text-lg">🔥</span>
                    <span className="font-medium">Feed</span>
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 rounded-lg font-medium"
                  >
                    <span className="text-lg">🚪</span>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
