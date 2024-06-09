import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = userAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
      <Link
        to="/"
        className="uppercase font-nsans-bold text-red-600 cursor-pointer text-4xl md:text-5xl lg:text-5xl"
      >
        netflix
      </Link>

      {user?.email ? (
        <div>
          <Link to="/profile">
            <button className="capitalize pr-4">Profile</button>
          </Link>
          <button
            onClick={handleLogout}
            className="capitalize bg-red-600 px-6 py-2 cursor-pointer rounded"
          >
            Logout
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Navbar;
