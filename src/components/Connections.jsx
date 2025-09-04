/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Card } from "flowbite-react";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  // debug: show reducer store value
  console.log("Connections selector value:", connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data || res.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // show loading while undefined
  if (connections === undefined || connections === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading connections…</p>
          <p className="text-gray-400 text-sm mt-2">
            Hang tight — fetching your network
          </p>
        </div>
      </div>
    );
  }

  const list = Array.isArray(connections)
    ? connections
    : connections?.data ?? [];

  if (list.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-6xl mb-4">🤝</div>
          <h1 className="font-bold text-2xl text-white mb-2">
            No connections yet
          </h1>
          <p className="text-gray-400 mb-6">
            Start connecting with developers to grow your network.
          </p>
          <div className="inline-flex gap-3">
            <button className="btn btn-primary bg-gradient-to-r from-purple-600 to-blue-600 border-none">
              Discover Developers
            </button>
            <button className="btn btn-ghost text-white/80">
              Edit Profile
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
            Your Connections
          </h1>
          <p className="text-gray-400 mt-2">
            People you've connected with on Dev Tinder
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {list.map((connection, index) => {
            const {
              id,
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
            } = connection || {};

            return (
              <article
                key={id ?? index}
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
                  <button className="btn btn-sm btn-ghost text-white/90">
                    View
                  </button>
                  <button className="btn btn-sm bg-gradient-to-r from-purple-600 to-blue-600 border-none text-white">
                    Message
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

export default Connections;
