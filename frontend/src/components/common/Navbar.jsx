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

  const { user, loading, errorMeassage, getUser } = userStore();

  return (
    <header className="flex items-center justify-between px-2 md:px-[200px] py-4 bg-white"className="flex items-center justify-between px-2 md:px-[200px] py-4 bg-white">
        <Link to="/" className="text-x-small-size pr-2 md:text-small-size font-bold">
          OpenBlog
        </Link>
        {path === "/" && (
          <div className="flex justify-center items-center space-x-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none px-2 py-1 text-small-size text-gray-700 rounded-l-medium bg-base"
              placeholder="Search for posts, users"
            />
            <button
              className="p-1.5 rounded-r-medium text-center bg-accent text-white cursor-pointer"
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
              <Link to="/create">Create</Link>
            </h3>
          ) : (
            <h3>
              <Link
                to="/login"
                className="text-small-size border-1 border-accent text-accent bg-transparent p-2 pl-3 pr-3 rounded-md cursor-pointer hover:bg-gray-100"
                style={{
                  transition: "all 350ms ease-in",
                }}
              >
                Login
              </Link>
            </h3>
          )}

          {/* code below will only show the menu if the user is logged id */}
          {user ? (
            <div onClick={() => showMenu()}>
              <button className="cursor-pointer relative">
                <BiMenu />
                {menu && <Menu />}
              </button>
            </div>
          ) : (
            <Link to="/register" className="text-small-size bg-accent text-white p-2 pl-2 pr-2 rounded-md ">
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
