import axios from "axios";
import React, { useEffect, useCallback } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = useCallback(async () => {
    // Only skip if feed is a non-empty array
    if (feed && Array.isArray(feed) && feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log("Feed API response:", res.data);
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log("Error fetching feed:", error);
    }
  }, [feed, dispatch]);

  useEffect(() => {
    getFeed();
  }, []);

  console.log("Feed data:", feed);
  console.log("First user:", feed?.[0] || feed?.data?.[0]);

  // Show loading if feed is undefined/null
  if (feed === undefined || feed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading feed…</p>
      </div>
    );
  }

  // Normalize feed to array
  const list = Array.isArray(feed) ? feed : feed?.data ?? [];

  if (list.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="font-bold text-2xl text-center">
          No more users in your feed!
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center mt-20 text-4xl font-extrabold font-mono bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-wider underline decoration-blue-600 decoration-2 underline-offset-4">
        Your Feed
      </h1>
      <div className="flex justify-center my-2">
        <UserCard user={list[0]}></UserCard>
      </div>
    </div>
  );
};

export default Feed;
