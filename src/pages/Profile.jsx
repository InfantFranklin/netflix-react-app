import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { userAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImageUrl } from "../services/movieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = userAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().showFavorites);
      });
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const removeFavorites = async (movie) => {
    const userDoc = doc(db, "users", user.email);

    await updateDoc(userDoc, {
      showFavorites: arrayRemove(movie),
    });
  };

  return (
    <>
      <div className="block w-full h-[500px] object-cover">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="//"
        />
        <div className=" bg-black/60 fixed top-0 left-0 w-full h-screen " />
        <div className="absolute top-[10%] md:top-[20%] p-4 md:p-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl my-2 font-nsans-bold">
            My Shows
          </h1>
          <p className="font-nsans-light text-gray-400 text-lg">{user.email}</p>
        </div>

        {/* movie row */}
        <h2 className=" font-nsans-bold md:text-xl p-4 capitalize">
          Favorite Shows
        </h2>

        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={() => slide(-500)}
            size={40}
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          />
          <div
            id={`slider`}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {/* movie item */}
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
              >
                <img
                  className="w-full h-40 object-cover object-top"
                  src={createImageUrl(
                    movie.backdrop_path ?? movie.poster_path,
                    "w500"
                  )}
                  alt={movie.title}
                />
                <div className="absolute w-full h-40 top-0 left-0 bg-black/80 opacity-0 hover:opacity-100">
                  <p className=" whitespace-normal text-xs sm:text-sm flex justify-center items-center h-full font-nsans-bold">
                    {movie.title}
                  </p>
                  <p>
                    <AiOutlineClose
                      onClick={() => removeFavorites(movie)}
                      className="absolute top-2 right-2"
                      size={30}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <MdChevronRight
            onClick={() => slide(500)}
            size={40}
            className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
