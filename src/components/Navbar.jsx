import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
      <Link
        to="/"
        className="uppercase font-nsans-bold text-red-600 cursor-pointer text-5xl"
      >
        netflix
      </Link>

      <div>
        <Link to="/login">
          <button className="capitalize pr-4">login</button>
        </Link>

        <Link to="/signup">
          <button className="capitalize bg-red-600 px-6 py-2 cursor-pointer rounded">
            sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
