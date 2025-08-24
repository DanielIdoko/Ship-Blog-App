import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../url";
import { BiArrowFromLeft } from "react-icons/bi";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // handle change for input fields
  const handleChange = useCallback((e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  });

  // sign new user function
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (user.username == "" || user.email == "" || user.password == "") {
        setErrorMessage("Invalid selection. Fields cannot be empty");
      }

      const response = await axios.post(`${URL}/api/auth/register`, {
        ...user,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage("");
      console.log(response.data);

      setUser({ username: "", email: "", password: "" });
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message)
        setErrorMessage(err.response.data.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full h-screen relative">
      <Link
        to="/"
        className="text-x-medium-size font-normal font-f-family-2 text-primary absolute top-10 left-[37%] md:left-[47%]"
      >
        Ship Blog
      </Link>
      <div className="w-full bg-transparent h-full p-1 flex justify-center items-center flex-col shadow-2xs shadow-accent">
        <form
          onSubmit={(e) => handleRegister(e)}
          className="w-[320px] md:w-[430px] h-[430px] rounded-sm bg-white flex flex-col gap-3 p-3 shadow-xl shadow-gray-300"
        >
          <h2 className="text-medium-size text-center text-accent font-f-family-2 font-bold">
            Sign Up
          </h2>

          <label
            htmlFor="username"
            className="text-small-size text-gray-800 font-f-family-2 pl-1"
          >
            UserName
          </label>
          <input
            type="text"
            id="username"
            value={user.username}
            autoFocus
            name="username"
            placeholder="e.g John Doe"
            onChange={handleChange}
            className="bg-gray-200 p-2 rounded-md text-small-size focus:outline-1 focus:outline-gray-400"
          />

          <label
            htmlFor="email"
            className="text-small-size text-gray-800 font-f-family-2 pl-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            name="email"
            onChange={handleChange}
            placeholder="e.g example@gmail.com"
            className="bg-gray-200 p-2 rounded-md text-small-size focus:outline-1 focus:outline-gray-400"
          />

          <label
            htmlFor="password"
            className="text-small-size text-gray-800 font-f-family-2 pl-0.5"
          >
            UserName
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="bg-gray-200 p-2 rounded-md text-small-size focus:outline-1 focus:outline-gray-400"
          />

          <button
            type="submit"
            className="p-2 mt-10 text-center flex items-center justify-center gap-2 bg-accent text-white text-small-size rounded-md cursor-pointer font-f-family-2"
          >
            Get Started <BiArrowFromLeft />
          </button>
          <div className="flex flex-row gap-2 w-full h-fit items-center justify-center mt-2">
            <p className="text-small-size text-accent">Got an Account?</p>
            <Link to="/login" className="text-blue-700 text-small-size underline">Login</Link>
          </div>
        </form>

        {errorMessage && (
          <p className="pt-5 text-red-600 text-small-size">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Register;
