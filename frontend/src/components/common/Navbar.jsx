import React, { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiMenu, BiSearch } from "react-icons/bi";
import Menu from "../Menu";
import userStore from "../../store/userStore";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  // this function below will toggle the menu shown or otherwise
  const showMenu = useCallback(() => {
    setMenu(!menu);
  });

  const { user, loading, errorMessage, getUser } = userStore();

  return (
    <header className="flex items-center justify-between px-2 md:px-3 lg:px-20 py-3 bg-white">
      <Link
        to="/"
        className="text-x-small-size pr-2 md:text-small-size font-semibold text-gray-800"
      >
        OpenBlog
      </Link>
      {path === "/" && (
        <div className="flex justify-center md:w-xl ld:w-2xl py-1 h-11 items-center space-x-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-[60%] lg:w-[90%] w-[80%] md:h-full outline-none px-2 py-1 text-small-size text-gray-700 rounded-l-medium bg-base"
            placeholder="Search for posts, users"
          />
          <button
            className="p-1.5 text-medium-size flex items-center justify-center rounded-r-medium  md:h-full md:w-11 bg-accent text-white cursor-pointer"
            onClick={() =>
              navigate(searchTerm ? `?search/${searchTerm}` : navigate("/"))
            }
          >
            <BiSearch />
          </button>
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 ">
        {user ? (
          <h3>
            <Link
              to="/create"
              className="border-1 border-accent p-3 rounded-md text-small-size cursor-pointer hover:bg-accent hover:text-white transition duration-350 ease-in font-f-family-1"
            >
              Create
            </Link>
          </h3>
        ) : (
          <Link
            to="/login"
            className="text-small-size text-accent bg-transparent p-2 pl-3 pr-3 rounded-md cursor-pointer hover:bg-gray-200  transition-all duration-350 ease-in font-f-family-1"
          >
            Login
          </Link>
        )}

        {/* code below will only show the menu if the user is logged id */}
        {user ? (
          <div onClick={() => showMenu()}>
            <button className="cursor-pointer relative text-x-medium-size">
              <BiMenu />
              {menu && <Menu />}
            </button>
          </div>
        ) : (
          <Link
            to="/register"
            className="text-small-size text-white bg-accent p-2 pl-3 pr-3 rounded-md cursor-pointer font-f-family-1"
          >
            Sign Up
          </Link>
        )}
      </div>

      <div onClick={() => showMenu()} className="md:hidden text-lg">
        <button className="cursor-pointer relative ">
          <BiMenu />
        </button>
        {menu && <Menu />}
      </div>
    </header>
  );
};

export default Navbar;
