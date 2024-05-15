import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToFavorite,
  removeFromFavorite,
  setMealId,
} from "../redux/reducers/recipeReducers";
import { useNavigate } from "react-router-dom";

function Card({ isLoading, data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state?.recipe.favorites);
  const isLoggedIn = useSelector((state) => state?.auth.isLoggedIn);
  const user = useSelector((state) => state?.auth?.user);
  const email = user?.email || "";

  const handleClickCard = (e) => {
    if (isLoggedIn) {
      navigate(`/recipe-details/${e?.idMeal}`);
      dispatch(setMealId(e?.idMeal));
    } else {
      toast.error("Oops.. you need to log in first to view recipe details.");
      navigate("/login");
    }
  };

  const isInFavorite = (mealId) => {
    const userFavorites = favorites || {};
    return userFavorites[email]?.some((meal) => meal.idMeal === mealId);
  };

  const handleClickHeart = (meal) => {
    if (isLoggedIn) {
      if (isInFavorite(meal.idMeal)) {
        dispatch(removeFromFavorite({ mealId: meal.idMeal, userEmail: email }));
        toast.success("Successfully  removed from favorite");
      } else {
        dispatch(addToFavorite({ meal, userEmail: email }));
        toast.success("Successfully  added to favorite");
      }
    } else {
      toast.error("Please log in to add to favorites");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading ? (
        Array.from({ length: 28 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-full bg-transparent overflow-hidden text-white"
          >
            <Skeleton height={208} width={270} />
            <div className="py-3">
              <div className="flex flex-col justify-between">
                <div className="min-h-8">
                  <p className="text-sm font-semibold leading-tight line-clamp-2">
                    <Skeleton />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : Array.isArray(data) && data.length > 0 ? (
        data.map((e, i) => (
          <div
            key={i}
            className="relative w-full bg-white rounded-lg h-full bg-transparent overflow-hidden text-main transition-transform duration-300 hover:scale-[1.05] hover:shadow-lg"
          >
            {/* Heart button */}
            {isLoggedIn ? (
              <button
                onClick={() => handleClickHeart(e)}
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full z-10"
              >
                <svg
                  fill={isInFavorite(e.idMeal) ? "#ff2525" : "#a8a8a8"}
                  className="w-5 h-5 hover:fill-[#ff2525]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
              </button>
            ) : (
              ""
            )}

            {/* Gambar */}
            <img
              className="w-full cursor-pointer object-cover h-48 rounded-lg"
              src={e?.strMealThumb}
              alt={e?.strMeal}
              onClick={() => handleClickCard(e)}
            />

            {/* Konten teks */}
            <div className="p-3">
              <div className="flex flex-row justify-between">
                <div
                  className="min-h-10 cursor-pointer"
                  onClick={() => handleClickCard(e)}
                >
                  <p className="text-base font-semibold leading-tight">
                    {e?.strMeal}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col gap-4 text-center items-center justify-center">
          <img src="/nothing.gif" alt="Nothing" />
          <p>Oops.. there's nothing here.</p>
        </div>
      )}
    </div>
  );
}

export default Card;
