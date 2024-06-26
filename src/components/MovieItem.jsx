import React, { useState } from "react";
import { createImageUrl } from "../services/movieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { db } from "../services/firebase";
import { userAuth } from "../context/AuthContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const MovieItem = ({ movie }) => {
  const { title, backdrop_path, poster_path } = movie;
  const { user } = userAuth();
  const [like, setLike] = useState(false);

  const addToFavorite = async () => {
    const userEmail = user?.email;

    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        showFavorites: arrayUnion({ ...movie }),
      });
    } else {
      alert("Login to save a movie...");
    }
  };

  return (
    <>
      <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
        <img
          className="w-full h-40 object-cover object-top"
          src={createImageUrl(backdrop_path ?? poster_path, "w500")}
          alt={title}
        />
        <div className="absolute w-full h-40 top-0 left-0 bg-black/80 opacity-0 hover:opacity-100">
          <p className=" whitespace-normal text-xs sm:text-sm flex justify-center items-center h-full font-nsans-bold">
            {title}
          </p>
          <p onClick={addToFavorite}>
            {like ? (
              <FaHeart
                size={20}
                className="absolute top-2 left-2 text-gray-300"
              />
            ) : (
              <FaRegHeart
                size={20}
                className="absolute top-2 left-2 text-gray-300"
              />
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieItem;
