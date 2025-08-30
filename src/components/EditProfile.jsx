/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(
    user.data.firstName || user.firstName
  );
  const [lastName, setLastName] = useState(
    user.data.lastName || user.lastName
  );
  const [photoUrl, setPhotoUrl] = useState(
    user.data.photoUrl || user.photoUrl
  );
  const [age, setAge] = useState(user.data.age || user.age);
  const [gender, setGender] = useState(
    user.data.gender || user.gender
  );
  const [about, setAbout] = useState(user.data.about || user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
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
      navigate("/profile");
    } catch (error) {
      setError(error.message);
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
            <div className="form-control px-5 py-7">
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
                className="select select-ghost"
              >
                <option>{gender}</option>
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
