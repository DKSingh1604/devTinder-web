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
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          👨‍💻 Dev Tinder
        </Link>
      </div>
      <div className="flex gap-1 items-center">
        {user && <p>{user.message}</p>}
        {user && (
          <div className="dropdown dropdown-end flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost mx-5 btn-circle avatar"
              ref={dropdownToggleRef}
            >
              <div className="w-10 rounded-lg">
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
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between"
                  onClick={() => dropdownToggleRef.current?.blur()}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  onClick={() => dropdownToggleRef.current?.blur()}
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  onClick={() => dropdownToggleRef.current?.blur()}
                >
                  Requests
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout}> Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
