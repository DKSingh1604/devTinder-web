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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">
            Loading your feed...
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Finding amazing developers for you
          </p>
        </div>
      </div>
    );
  }

  // Normalize feed to array
  const list = Array.isArray(feed) ? feed : feed?.data ?? [];

  if (list.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-6">👨‍💻</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            No more users in your feed!
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            You've seen all available developers. Check back later for new
            connections!
          </p>
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
            <p className="text-purple-300 text-sm">
              💡 Tip: Update your preferences to see more developers
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-center mt-8 text-4xl font-extrabold font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 tracking-wider underline decoration-blue-400 decoration-2 underline-offset-4">
            Your Feed
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover amazing developers and build connections in the tech
            community
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
            <UserCard user={list[0]} />
          </div>
        </div>

        <div className="text-center mt-8 mb-15">
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
            <span>👆</span>
            <span>Swipe or click to explore profiles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
