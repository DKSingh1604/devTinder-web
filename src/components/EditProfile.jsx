/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //populate when user prop arrives
  useEffect(() => {
    if (!user) return;
    const u = user.data || user;
    setFirstName(u.firstName || "");
    setLastName(u.lastName || "");
    setPhotoUrl(u.photoUrl || "");
    setAge(u.age || "");
    setGender(u.gender || "");
    setAbout(u.about || "");
  }, [user]);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      // show success alert then navigate after short delay
      setSuccess("Profile saved successfully");
      setTimeout(() => navigate("/profile"), 900);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 tracking-wider">
            Edit Your Profile
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Update your information and see how it looks to other
            developers
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 max-w-7xl mx-auto mb-15">
          {/* Form Section */}
          <div className="flex-1 max-w-lg">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Profile Details
                </h2>
                <p className="text-gray-400 text-sm">
                  Make your profile stand out
                </p>
              </div>
              <div className="form-control space-y-4">
                {/* First Name */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text text-white font-medium">
                      👤 First Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    id="firstName"
                    value={firstName}
                    className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                {/* Last Name */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text text-white font-medium">
                      👤 Last Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    id="lastName"
                    value={lastName}
                    className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                {/* Age */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text text-white font-medium">
                      🎂 Age
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your age"
                    id="age"
                    value={age}
                    className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                {/* Gender */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text text-white font-medium">
                      ⚧ Gender
                    </span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full bg-white/10 border-white/20 text-white focus:border-purple-400 focus:outline-none"
                  >
                    <option value="" className="text-gray-600">
                      Select Gender
                    </option>
                    <option value="male" className="text-gray-600">
                      Male
                    </option>
                    <option value="female" className="text-gray-600">
                      Female
                    </option>
                    <option value="others" className="text-gray-600">
                      Others
                    </option>
                  </select>
                </div>

                {/* About */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text text-white font-medium">
                      📝 About
                    </span>
                  </label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    id="about"
                    value={about}
                    rows="3"
                    className="textarea textarea-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>

                {/* Photo URL */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text text-white font-medium">
                      📸 Photo URL
                    </span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    id="photoUrl"
                    value={photoUrl}
                    className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </div>
              </div>
              {/* Success Message */}
              {success && (
                <div className="alert alert-success bg-green-500/20 border-green-500/30 text-green-300 border mt-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">{success}</span>
                  <button
                    className="btn btn-ghost btn-sm ml-4 text-green-300 hover:bg-green-500/20"
                    onClick={() => setSuccess("")}
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="alert alert-error bg-red-500/20 border-red-500/30 text-red-300 border mt-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              )}

              {/* Save Button */}
              <div className="card-actions justify-center mt-8">
                <button
                  className="btn btn-primary bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  onClick={saveProfile}
                >
                  💾 Save Profile
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex-1 max-w-md">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  👀 Live Preview
                </h3>
                <p className="text-gray-400 text-sm">
                  See how your profile looks
                </p>
              </div>
              <div className="flex justify-center">
                <UserCard
                  user={{
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
