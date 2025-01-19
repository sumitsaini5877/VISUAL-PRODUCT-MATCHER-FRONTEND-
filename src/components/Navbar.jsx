

import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-slate-100 fixed top-0 left-0 right-0 flex justify-between h-16 items-center border-b-2 p-2 px-4 sm:px-6 lg:px-8">
      
      <div className="logo font-serif text-lg">Visual-Matcher</div>

      
      <div
        className="sm:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </div>

     
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-slate-100 sm:static sm:block sm:w-auto`}
      >
        <ul className="flex flex-col sm:flex-row sm:gap-8 px-4 sm:px-0">
          <li className="font-serif  cursor-pointer py-2 sm:py-0">
            <NavLink to="/"
            className={({isActive})=>isActive?" font-bold":"hover:underline"}
            >
             Home
            </NavLink>
            
          </li>
          <li className="font-serif  cursor-pointer py-2 sm:py-0">
            <NavLink 
            to="/addProduct"
            className={({isActive})=>isActive?"font-bold":"hover:underline"}
            >
            Add Product
            </NavLink>
            
          </li>
          <li className="font-serif hover:underline cursor-pointer py-2 sm:py-0">
            <NavLink
            to="/showProducts"
            className={({isActive})=>isActive?"font-bold":"hover:underline"}
            >
            Show Product
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
