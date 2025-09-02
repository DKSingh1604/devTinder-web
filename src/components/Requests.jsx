import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(addRequests(res.data.data || res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  // show loading while undefined
  if (requests === undefined || requests === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading requests…</p>
      </div>
    );
  }

  const list = Array.isArray(requests)
    ? requests
    : requests?.data.data ?? [];

  if (list.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <h1 className="font-bold text-2xl text-center">
          You don't have any requests yet!
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen flex  justify-center my-10">
      <div className="w-full max-w-5xl px-4">
        <h1 className="font-bold text-2xl text-center mb-10">
          Requests
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((request, index) => {
            const {
              id,
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
            } = request.fromUserId || {};

            return (
              <article
                key={id ?? index}
                className="bg-base-200 rounded-2xl shadow-md overflow-hidden p-4 flex flex-col items-center text-center"
              >
                <img
                  src={photoUrl || "https://via.placeholder.com/160"}
                  alt={`${firstName || "User"} avatar`}
                  className="w-28 h-28 rounded-full object-cover mb-4 ring-1 ring-black/5"
                />
                <div className="text-lg font-semibold">
                  {firstName ?? "Unknown"} {lastName ?? ""}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {age ? `${age} yrs` : ""}{" "}
                  {gender ? ` • ${gender}` : ""}
                </div>
                <p className="text-sm mt-3 line-clamp-3 px-2">
                  {about ?? "No description"}
                </p>

                <div className="mt-4 flex gap-2">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                      Reject
                    </span>
                  </button>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Accept
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
