import React, { useCallback } from "react";
import axios from "axios";
import userStore from "../store/userStore";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut, BiUser } from "react-icons/bi";

const Menu = () => {
  const { user } = userStore((state) => state.user);
  const navigate = useNavigate();

  
  const logUserOut = useCallback(async (params) => {
    try {
      const res = await axios.post("/api/auth/logout", {
        withCredentials: true,
      });
      user: null;
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  });

  return (
    <div className="bg-white w-[220px] h-fit rounded-xl z-30 flex flex-col items-start absolute top-16 right-5 md:right-2 border-1 border-gray-300 p-4 space-y-4 transition-all duration-300 ease-in">
      {!user && (
        <Link
          to={"/profile:"}
          className="text-medium-size p-2  text-gray-600 font-normal font-sans flex items-center justify-start hover:text-accent transition duration-75 ease-in"
        >
          <BiUser /> Profile
        </Link>
      )}
      {user && (
        <Link
          to="/login"
          className="text-small-size text-accent bg-transparent p-2 rounded-md cursor-pointer hover:bg-accent hover:text-white transition-all duration-350 ease-in font-f-family-1"
        >
          Login
        </Link>
      )}

      {user && (
        <Link
          to="/register"
          className="text-small-size text-accent bg-transparent p-2 rounded-md cursor-pointer hover:bg-accent hover:text-white transition-all duration-350 ease-in font-f-family-1"
        >
          Sign Up
        </Link>
      )}
      {!user && (
        <Link
          to="/create"
          className="text-accent p-1 pl-2 pr-2 text-x-small-size bg-transparent hover:bg-gray-200 hover:text-gray-700 cursor-pointer rounded-md transition duration-300 ease-in font-f-family-1"
        >
          Write Something
        </Link>
      )}
      {!user && (
        <Link
          to={"/myblogs:"}
          className="text-accent p-1 pl-2 pr-2 text-x-small-size bg-transparent hover:bg-gray-200 hover:text-gray-700 cursor-pointer rounded-md transition duration-300 ease-in font-f-family-1"
        >
          My Blogs
        </Link>
      )}

      {!user && (
        <button
          className="mt-3 text-small-size text-red-600 flex border-0 items-center justify-start gap-1 p-2 cursor-pointer"
          onClick={() => logUserOut()}
        >
          Logout <BiLogOut />
        </button>
      )}
    </div>
  );
};

export default Menu;
