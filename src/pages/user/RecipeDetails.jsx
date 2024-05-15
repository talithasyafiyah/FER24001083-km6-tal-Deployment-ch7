import React, { useState, useEffect } from "react";
import Navbar from "../../components/navigations/Navbar";
import Footer from "../../components/navigations/Footer";
import Slider from "../../components/slider/HeaderSlider";
import { ProgressBar } from "react-loader-spinner";
import { getMealDetail } from "../../redux/actions/recipeActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RecipeDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const data = useSelector((state) => state.recipe.mealDetail);

  useEffect(() => {
    dispatch(getMealDetail())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(true));
  }, [navigate, dispatch]);

  const instructions = data[0]?.strInstructions
    .split(". ")
    .filter((instruction) => instruction);

  const ingredientElements = [];
  for (let i = 1; i <= 20; i++) {
    const measure = data[0][`strMeasure${i}`];
    const ingredient = data[0][`strIngredient${i}`];

    if (measure && ingredient) {
      ingredientElements.push(
        <div key={i} className="flex items-center gap-3">
          <p className="text-primary text-xl font-bold">{measure}</p>
          <p className="text-main text-base font-medium">{ingredient}</p>
        </div>
      );
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <img src="/loading.gif" alt="loading..." />
        </div>
      ) : (
        <div>
          <Navbar transparent={true} />

          {/* Hero Section */}
          <div className="relative h-[100px] md:h-[120px] overflow-x-hidden overflow-y-hidden">
            <div className="w-full h-[120px] absolute top-0">
              <Slider />
            </div>
          </div>

          {/* Detail Section */}
          <section className="container mt-6 md:mt-8 mb-20">
            <div className="flex">
              {data && data.length > 0 && (
                <div>
                  <div>
                    <h1 className="text-xl font-semibold text-main text-left mb-6">
                      Details of{" "}
                      <span className="text-primary">{data[0]?.strMeal}</span>
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-full md:w-1/2">
                        <div className="w-full h-60">
                          <img
                            src={data[0]?.strMealThumb}
                            alt={data[0]?.strMeal}
                            className="w-full h-60 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2">
                        <h1 className="text-2xl font-bold text-main text-left mb-2">
                          {data[0]?.strMeal}
                        </h1>
                        <div className="flex gap-2">
                          <p className="text-white font-normal text-base mt-2">
                            <div className="bg-white border-2 border-primary text-primary font-semibold rounded-full px-4 py-0.5">
                              {data[0]?.strCategory}
                            </div>
                          </p>
                          <p className="text-white font-normal text-base mt-2">
                            <div className="bg-white border-2 border-primary text-primary font-semibold rounded-full px-4 py-0.5">
                              {data[0]?.strArea}
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 mt-10">
                    <div className="w-full md:w-1/2">
                      {/* Title */}
                      <div className="flex gap-4 mb-8">
                        <div className="h-16 border-2 border-primary"></div>
                        <div className="text-main">
                          <div className="flex flex-col">
                            <p className="text-base text-primary font-medium tracking-[5px]">
                              Ingredients
                            </p>
                            <p className="text-lg font-semibold mt-1">
                              Essential Ingredients List
                            </p>
                          </div>
                        </div>
                      </div>

                      {ingredientElements}
                    </div>
                    <div className="w-full md:w-1/2">
                      {/* Title */}
                      <div className="flex gap-4 mb-8">
                        <div className="h-16 border-2 border-primary"></div>
                        <div className="text-main">
                          <div className="flex flex-col">
                            <p className="text-base text-primary font-medium tracking-[5px]">
                              Instructions
                            </p>
                            <p className="text-lg font-semibold mt-1">
                              Step-by-Step Cooking Guide
                            </p>
                          </div>
                        </div>
                      </div>
                      {instructions.map((instruction, index) => (
                        <li key={index} className="mb-2">
                          {instruction.trim()}
                        </li>
                      ))}
                    </div>
                  </div>

                  {/* Video */}
                  <div className="w-full mt-10">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                      {/* Title */}
                      <div className="w-full md:w-1/3">
                        <div className="flex gap-4 mb-8">
                          <div className="h-16 border-2 border-primary"></div>
                          <div className="text-main">
                            <div className="flex flex-col">
                              <p className="text-base text-primary font-medium tracking-[5px]">
                                Video
                              </p>
                              <p className="text-lg font-semibold mt-1">
                                Watch and Cook Along
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-2/3">
                        <iframe
                          allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          width="100%"
                          height="320"
                          src={`https://www.youtube.com/embed/${data[0]?.strYoutube.slice(
                            -11
                          )}`}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
