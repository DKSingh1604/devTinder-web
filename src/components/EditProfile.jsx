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
    <div className="flex justify-center my-10">
      <div className="flex justify-center my-10 mx-10">
        <div className="card card-border bg-base-200 w-96">
          <div className="card-body ">
            <div className="flex justify-center">
              <h2 className="card-title">Edit Profile</h2>
            </div>
            <div className="form-control px-5">
              {/* First Name */}
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                value={firstName}
                className="input input-ghost w-full max-w-xs mb-4"
                onChange={(e) => setFirstName(e.target.value)}
              />

              {/* LAST NAME */}
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                value={lastName}
                className="input input-ghost w-full max-w-xs mb-4"
                onChange={(e) => setLastName(e.target.value)}
              />

              {/* AGE */}
              <input
                type="text"
                placeholder="Age"
                id="age"
                value={age}
                className="input input-ghost w-full max-w-xs mb-4"
                onChange={(e) => setAge(e.target.value)}
              />

              {/* GENDER */}
              <select
                defaultValue="Gender"
                onChange={(e) => setGender(e.target.value)}
                className="select select-ghost w-full max-w-xs mb-4"
              >
                <option value="">Select Gender</option>
                <option>male</option>
                <option>female</option>
                <option>others</option>
              </select>

              {/* ABOUT */}
              <input
                type="text"
                placeholder="About"
                id="about"
                value={about}
                className="input input-ghost w-full max-w-xs mb-4 mt-5"
                onChange={(e) => setAbout(e.target.value)}
              />

              {/* PHOT0 URL */}
              <input
                type="text"
                placeholder="Photo Url"
                id="photoUrl"
                value={photoUrl}
                className="input input-ghost w-full max-w-xs mb-4"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            {success && (
              <div className="alert alert-success my-4" role="alert">
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
                <span>{success}</span>
                <button
                  className="btn btn-ghost btn-sm ml-4"
                  onClick={() => setSuccess("")}
                >
                  Dismiss
                </button>
              </div>
            )}
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-secondary"
                onClick={saveProfile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-15 items-center">
        <h1 className="mb-5">Preview</h1>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        ></UserCard>
      </div>
    </div>
  );
};

export default EditProfile;
