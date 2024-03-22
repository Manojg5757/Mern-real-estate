import React from "react";
import { FaSearchengin } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

const Header = () => {
  const {currentUser} = useSelector(state=>state.user)
  console.log(currentUser)
  return (
    <header className="bg-slate-300 shadow-md">
      <div className="flex justify-between items-center max-w-6xl m-auto p-3">
        <div className="flex flex-wrap font-bold text-sm sm:text-xl">
          <span className="text-slate-500">Prime</span>
          <span className="text-slate-700">Estate</span>
        </div>
        <form className="bg-slate-100 flex items-center p-3 rounded-full">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-24 sm:w-64"
          />
          <FaSearchengin />
        </form>
        <ul className="flex gap-4">
          <li className=" hidden sm:inline text-slate-700 hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className=" hidden sm:inline text-slate-700 hover:underline">
            <Link to="/about">About</Link>
          </li>
          <Link to="/profile">
            {
              currentUser ? <img className="rounded-full h-7 w-7" src={currentUser.avatar} alt="profile" />:
              <li className=" hidden sm:inline text-slate-700 hover:underline">
              Signin
            </li>
            }
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
