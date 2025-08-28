/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("narendra@gmail.com");
  const [password, setPassword] = useState("Narendra@1604");
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
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!");
      console.log(error);
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
          <p className="text-red-500">{error}</p>
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
