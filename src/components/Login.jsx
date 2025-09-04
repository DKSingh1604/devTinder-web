/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!");
      console.log(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data || res.data));
      navigate("/profile");
    } catch (error) {
      console.log(`Error signing up: ${error}`);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body ">
          <div className="flex justify-center">
            <h2 className="card-title">
              {isLoginForm ? "Login" : "SignUp"}
            </h2>
          </div>
          <div className="form-control px-5 py-7">
            {!isLoginForm && (
              <>
                {/* FIRST NAME */}
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
              </>
            )}

            {/* EMAIL FIELD */}
            <input
              type="text"
              placeholder="Email ID"
              id="emailId"
              value={emailId}
              className="input input-ghost w-full max-w-xs mb-4"
              onChange={(e) => setEmailId(e.target.value)}
            />
            {/* PASSWORD FIELD */}
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              className="input input-ghost w-full max-w-xs mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center flex-col items-center">
            <button
              className="btn btn-secondary mb-5"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
            <div>
              <Link onClick={() => setIsLoginForm((value) => !value)}>
                {isLoginForm
                  ? "New User? Sign Up here"
                  : "ALready have an account? Login here"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
