/* eslint-disable no-unused-vars */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(`Error sending request: ${error}`);
    }
  };

  console.log("UserCard received user:", user);

  // Handle undefined user
  if (!user) {
    return (
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Loading...</h2>
          <p>No user data available</p>
        </div>
      </div>
    );
  }

  // Handle nested data structure (if user.data exists)
  const userData = user.data || user;

  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
          <img
            src={
              userData.photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={userData.firstName || "User"}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {userData.firstName} {userData.lastName}
          </h2>
          <h3>
            {userData.age || "Age NA!"}, {userData.gender || "Gender NA!"}
          </h3>
          <p>
            {userData.about ||
              "A card component has a figure, a body part, and inside body there are title and actions parts"}
          </p>
          <div className="card-actions justify-center my-4">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
              onClick={() => handleSendRequest("ignored", userData._id)}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Ignore
              </span>
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => handleSendRequest("interested", userData._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
