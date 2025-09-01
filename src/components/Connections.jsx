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
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading connections…</p>
      </div>
    );
  }

  const list = Array.isArray(connections)
    ? connections
    : connections?.data ?? [];

  if (list.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <h1 className="font-bold text-2xl text-center">
          You don't have any connections yet!
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl px-4">
        <h1 className="font-bold text-2xl text-center mb-10">
          Connections
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <button className="btn btn-sm btn-ghost">
                    View
                  </button>
                  <button className="btn btn-sm btn-primary">
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
