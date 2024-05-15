import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navigations/Navbar";
import Footer from "../../components/navigations/Footer";
import Slider from "../../components/slider/HeaderSlider";
import { ProgressBar } from "react-loader-spinner";
import {
  setMealId,
  setSearchKeyword,
} from "../../redux/reducers/recipeReducers";
import { getMeal, getSearchResults } from "../../redux/actions/recipeActions";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../functions/debounce";
import Card from "../../components/Card";

function SearchRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const searchTerm = useSelector((state) => state?.recipe.searchKeyword);
  const preview = useSelector((state) => state?.recipe.meal);
  const searchResults = useSelector((state) => state?.recipe.searchResults);

  useEffect(() => {
    dispatch(getMeal())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(true));
  }, [navigate, dispatch]);

  const searchRecipe = (term) => {
    dispatch(getSearchResults());
  };

  const delayedSearch = useDebounce(searchRecipe, 300);

  const handleSearchInputChange = (e) => {
    dispatch(setSearchKeyword(e.target.value));
    delayedSearch(e.target.value);
  };

  const data =
    searchResults && searchResults.length > 0 ? searchResults : preview;

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <img src="/loading.gif" alt="loading..." />
        </div>
      ) : (
        <div>
          <Navbar transparent={true} />
          <div className="relative h-[200px] md:h-[280px] overflow-x-hidden overflow-y-hidden">
            <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-3/4 md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-semibold text-white text-center mb-4 md:mb-6">
                Search Recipes
              </h1>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search recipe.."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className="w-full items-center rounded-full text-base shadow-md border border-gray-200 px-8 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <svg
                  className="items-center absolute right-6 top-3.5 h-5 w-5 text-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full h-[280px] absolute top-0">
              <Slider />
            </div>
          </div>

          <section id="card" className="container mt-6 md:mt-8 mb-16">
            <div>
              {Array.isArray(data) && data.length > 0 && searchTerm && (
                <h2 className="text-base text-left font-semibold text-main mb-4">
                  Showing {data.length} results for{" "}
                  <span className="text-secondary">"{searchTerm}"</span>
                </h2>
              )}

              {Array.isArray(data) && data.length === 0 && searchTerm && (
                <p className="text-base text-left font-semibold text-red-600 mb-4">
                  No recipes found for "{searchTerm}"
                </p>
              )}
              <Card isLoading={isLoading} data={data} />
            </div>
          </section>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default SearchRecipe;
