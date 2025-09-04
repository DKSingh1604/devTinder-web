/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  //review requests
  const reviewRequest = async (status, _id) => {
    console.log("review request function triggered!");
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
      console.log(`Request ${_id} ${status}ed successfully`);
    } catch (error) {
      console.log("Error reviewing request:", error);
    }
  };

  //fetch the requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addRequests(res.data.data || res.data));
    } catch (error) {
      console.log("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // show loading while undefined
  if (requests === undefined || requests === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading requests…</p>
          <p className="text-gray-400 text-sm mt-2">
            Checking your incoming requests
          </p>
        </div>
      </div>
    );
  }

  const list = Array.isArray(requests)
    ? requests
    : requests?.data.data ?? [];

  if (list.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-6xl mb-4">📨</div>
          <h1 className="font-bold text-2xl text-white mb-2">
            No requests yet
          </h1>
          <p className="text-gray-400 mb-6">
            You're all caught up. When someone requests to connect, it'll
            appear here.
          </p>
          <div className="inline-flex gap-3">
            <button className="btn btn-primary bg-gradient-to-r from-purple-600 to-blue-600 border-none">
              Discover Developers
            </button>
            <button className="btn btn-ghost text-white/80">
              Manage Profile
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Incoming Requests
          </h1>
          <p className="text-gray-400 mt-2">
            Review and respond to developer connection requests
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                key={request._id ?? id ?? index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col items-center text-center border border-white/10 hover:scale-105 transform transition-all duration-200"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 ring-2 ring-purple-400/40">
                  <img
                    src={photoUrl || "https://via.placeholder.com/160"}
                    alt={`${firstName || "User"} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-lg font-semibold text-white">
                  {firstName ?? "Unknown"} {lastName ?? ""}
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  {age ? `${age} yrs` : ""} {gender ? ` • ${gender}` : ""}
                </div>
                <p className="text-sm mt-3 text-gray-300 line-clamp-3 px-2">
                  {about ?? "No description"}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    className="btn btn-sm btn-ghost text-white/90"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-sm bg-gradient-to-r from-green-400 via-green-500 to-green-600 border-none text-white"
                    onClick={() => reviewRequest("accepted", request._id)}
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
