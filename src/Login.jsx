/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body ">
          <div className="flex justify-center">
            <h2 className="card-title">Login</h2>
          </div>
          <div className="form-control px-5 py-7">
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
          <div className="card-actions justify-center">
            <button className="btn btn-secondary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
