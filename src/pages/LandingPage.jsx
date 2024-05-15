import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMeal,
  getCategory,
  getMealSlider,
} from "../redux/actions/recipeActions";
import Navbar from "../components/navigations/Navbar";
import Footer from "../components/navigations/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroSlider from "../components/slider/HeroSlider";
import { toast } from "react-toastify";
import {
  setCategoryName,
  setMealId,
  addToFavorite,
  removeFromFavorite,
} from "../redux/reducers/recipeReducers";
import { noAccessToken } from "../redux/actions/authActions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "../components/Card";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [random, setRandom] = useState([]);
  const slider = useSelector((state) => state?.recipe.mealSlider);
  const data = useSelector((state) => state?.recipe);
  const isLoggedIn = useSelector((state) => state?.auth.isLoggedIn);

  useEffect(() => {
    dispatch(noAccessToken(navigate));
    dispatch(getCategory());
    dispatch(getMealSlider());
    getRandom();
    dispatch(getMeal())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(true));
  }, [dispatch, navigate]);

  async function getRandom() {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setRandom(response.data.meals);
    } catch (error) {
      toast.error(error);
    }
  }

  const handleClickCard = (e) => {
    if (isLoggedIn) {
      navigate(`/recipe-details/${e?.idMeal}`);
      dispatch(setMealId(e?.idMeal));
    } else {
      toast.error("Oops.. you need to log in first to view recipe details.");
      navigate("/login");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const settings2 = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesPerRow: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "60px",
          slidesToShow: 3,
          rows: 2,
          slidesPerRow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 1,
          slidesPerRow: 1,
          centerPadding: "0px",
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 3000,
          fade: true,
          waitForAnimate: false,
        },
      },
    ],
  };

  return (
    <div>
      <Navbar transparent={true} />

      {/* Hero Section */}
      <div className="relative h-screen overflow-x-hidden overflow-y-hidden">
        <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-3/4 md:w-1/2">
          <div className="text-center w-full text-white">
            <p className="text-[32px] md:text-[38px] font-bold">
              What would you like to cook today?
            </p>
            <p className="text-sm md:text-base font-normal leading-2 md:leading-6 my-2 drop-shadow-md">
              Discover the recipe you desire based on the provided categories or
              ingredients you have, and create your own version of the recipe to
              share it with others! You can do all of that on NomNom.
            </p>

            <a href={isLoggedIn ? "#recipe" : "/login"}>
              <button className="bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary rounded-full px-12 py-2 text-base text-white font-semibold mt-4">
                Discover Recipes
              </button>
            </a>
          </div>
        </div>
        <div className="w-full h-screen absolute top-0">
          <HeroSlider />
        </div>
      </div>

      {isLoggedIn ? (
        <>
          {/* Random Section */}
          <section id="card" className="container my-20">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {random.map((e, i) => (
                <div
                  key={i}
                  className="w-full md:w-1/2 relative cursor-pointer transition-transform duration-250 hover:scale-[1.05] hover:shadow-lg"
                  onClick={() => handleClickCard(e)}
                >
                  <img
                    className="h-[300px] w-full object-cover rounded-lg"
                    src={e.strMealThumb}
                    alt={e.strMeal}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#171717] text-white p-6 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <div className="w-8 border-t-2 border-white"></div>
                      <div>
                        <p className="text-2xl font-semibold">{e.strMeal}</p>
                        <div className="flex text-base items-center gap-2">
                          <p>{e.strCategory}</p>
                          <div className="h-1 w-1 bg-white rounded-full"></div>
                          <p>{e.strArea}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="w-full md:w-1/2">
                {/* Title */}
                <div className="flex gap-4 mb-4">
                  <div className="h-16 border-2 border-primary"></div>
                  <div className="text-main">
                    <div className="flex flex-col">
                      <p className="text-base text-primary font-medium tracking-[5px]">
                        Recipe Recomendation
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        Treat Your Taste Buds to Handpicked Culinary Gems!
                      </p>
                    </div>
                  </div>
                </div>
                {/* Description */}
                <div className="bg-white shadow-xl p-4 rounded-md">
                  <p className="text-base text-main">
                    Let us guide your culinary journey with our carefully
                    curated recipe recommendations, tailored to your taste
                    preferences and culinary interests. Explore a world of
                    delightful flavors and discover new favorites with every
                    recommendation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Category Section */}
          <section id="recipe" className="container">
            <h1 className="container text-3xl text-left font-bold text-main mb-6">
              Categories
            </h1>
            <Slider {...settings}>
              {isLoading
                ? Array.from({ length: data.category.length }).map(
                    (_, index) => (
                      <div key={index} className="w-[160px]">
                        <Skeleton height={160} width={160} />
                      </div>
                    )
                  )
                : data.category.map((e) => (
                    <div
                      key={e?.idCategory}
                      onClick={() => {
                        navigate("/list-categories");
                        dispatch(setCategoryName(e?.strCategory));
                      }}
                      className="cursor-pointer transition-transform duration-300 hover:scale-[1.08]"
                    >
                      <img
                        className="w-[160px] rounded-full"
                        src={e?.strCategoryThumb}
                        alt={e?.strCategory}
                      />
                      <div className="text-center mr-8 mt-2 text-sm text-main font-semibold">
                        <p>{e?.strCategory}</p>
                      </div>
                    </div>
                  ))}
            </Slider>
          </section>

          {/* Card Section */}
          <section id="card" className="container my-20">
            <h1 className="text-3xl text-left font-bold text-main mb-6">
              Recipe recommendations
            </h1>
            <Card isLoading={isLoading} data={data.meal} />
          </section>
        </>
      ) : (
        <>
          {/* Welcome Section */}
          <section id="card" className="container my-20">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {random.map((e, i) => (
                <div
                  key={i}
                  className="w-full md:w-1/2 relative cursor-pointer transition-transform duration-250 hover:scale-[1.05] hover:shadow-lg"
                  onClick={() => handleClickCard(e)}
                >
                  <img
                    className="h-[300px] w-full object-cover rounded-lg"
                    src={e.strMealThumb}
                    alt={e.strMeal}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#171717] text-white p-6 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <div className="w-8 border-t-2 border-white"></div>
                      <div>
                        <p className="text-2xl font-semibold">{e.strMeal}</p>
                        <div className="flex text-base items-center gap-2">
                          <p>{e.strCategory}</p>
                          <div className="h-1 w-1 bg-white rounded-full"></div>
                          <p>{e.strArea}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="w-full md:w-1/2">
                {/* Title */}
                <div className="flex gap-4 mb-4">
                  <div className="h-16 border-2 border-primary"></div>
                  <div className="text-main">
                    <div className="flex flex-col">
                      <p className="text-base text-primary font-medium tracking-[5px]">
                        Welcome
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        Flavorful Finds: Explore, Save, and Elevate Your
                        Culinary Journey!
                      </p>
                    </div>
                  </div>
                </div>
                {/* Description */}
                <div className="bg-white shadow-xl p-4 rounded-md">
                  <p className="text-base text-main">
                    Discovering new recipes has never been easier with our
                    powerful search feature. Whether you're craving a comforting
                    classic or itching to experiment with exotic ingredients,
                    simply type in your desired dish or ingredient, and let our
                    extensive database do the rest.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Card Section */}
          <section className="container mb-20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex gap-4 mb-4">
                <div className="h-16 border-2 border-primary"></div>
                <div className="text-main">
                  <div className="flex flex-col">
                    <p className="text-base text-primary font-medium tracking-[5px]">
                      Discover Recipes
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      Discover delightful recipes to inspire your next meal
                    </p>
                  </div>
                </div>
              </div>
              <a href={isLoggedIn ? "#recipe" : "/login"}>
                <button className="hidden md:block bg-white border-2 border-primary rounded-full px-8 py-2 text-base text-primary font-semibold transition-transform duration-300 hover:scale-[1.05] hover:shadow-lg">
                  <div className="flex gap-2 items-center">
                    Discover More
                    <svg
                      className="h-5 w-5 fill-primary cursor-pointer hover:fill-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                    </svg>
                  </div>
                </button>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
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
              ) : Array.isArray(data.meal) && data.meal.length > 0 ? (
                data.meal.slice(0, 8).map((e, i) => (
                  <div
                    key={i}
                    className="relative w-full bg-white rounded-lg h-full bg-transparent overflow-hidden text-main transition-transform duration-300 hover:scale-[1.05] hover:shadow-lg"
                    onClick={() => handleClickCard(e)}
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
                <p>No recipes available</p>
              )}
            </div>
          </section>

          {/* About Us */}
          <section
            id="about-us"
            className="mb-20 overflow-x-hidden overflow-y-hidden"
          >
            <div className="w-full h-[600px] md:h-[400px] relative">
              <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

              {/* Teks deskripsi*/}
              <div className="absolute top-[25%] left-[30%] w-full flex flex-col items-center justify-center p-4 z-20 overflow-x-hidden">
                <div className="bg-white py-8 pl-8 pr-40 rounded-lg shadow-lg w-[400px] md:w-[800px]">
                  <div className="flex gap-4 mb-8">
                    <div className="h-16 border-2 border-primary"></div>
                    <div className="text-main">
                      <div className="flex flex-col">
                        <p className="text-base text-primary font-medium tracking-[5px]">
                          About Us
                        </p>
                        <p className="text-lg font-semibold mt-1">
                          Unveiling Our Culinary Journey and Passion for
                          Flavorful Creations
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-main text-base text-left">
                    NomNom is your culinary companion, dedicated to inspiring
                    your kitchen creativity. Explore our flavorful journey and
                    join our vibrant cooking community today
                  </p>
                </div>
              </div>

              {slider.length > 0 && (
                <Slider {...settings2} className="relative z-0">
                  {slider.map((e, index) => (
                    <div
                      key={index}
                      className="h-[600px] md:h-[400px] relative"
                    >
                      <img
                        className="w-full h-[600px] md:h-[400px] object-cover"
                        src={e?.image}
                        alt={`Slide ${index}`}
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </section>

          {/* Features */}
          <section id="features" className="container mb-20">
            {/* Title */}
            <div className="flex gap-4 mb-8">
              <div className="h-16 border-2 border-primary"></div>
              <div className="text-main">
                <div className="flex flex-col">
                  <p className="text-base text-primary font-medium tracking-[5px]">
                    Our Features
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    Explore our features: effortlessly find, search, and
                    favorite your recipes
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center border-2 border-primary rounded-xl p-4 w-64 h-80 text-center">
                <img src="/find.gif" alt="Find" width={200} />
                <p className="text-base text-primary font-medium tracking-[3px] mb-3">
                  Find
                </p>
                <p className="text-main text-base font-normal">
                  Effortlessly discover the ideal recipe for every meal and
                  occasion.
                </p>
              </div>
              <div className="flex flex-col items-center border-2 border-primary rounded-xl p-4 w-64 h-80 text-center">
                <img src="/search.gif" alt="Search" />
                <p className="text-base text-primary font-medium tracking-[3px] mb-3">
                  Search
                </p>
                <p className="text-main text-base font-normal">
                  Utilize our advanced search tool to navigate through a vast
                  array of delicious recipes.
                </p>
              </div>
              <div className="flex flex-col items-center border-2 border-primary rounded-xl p-4 w-64 h-80 text-center">
                <img src="/favorite.gif" alt="Favorite" />
                <p className="text-base text-primary font-medium tracking-[3px] mb-3">
                  Favorite
                </p>
                <p className="text-main text-base font-normal">
                  Conveniently save your favorite recipes for easy access
                  whenever you need them.
                </p>
              </div>
            </div>
          </section>

          {/* Subscription */}
          <section className="bg-gradient-to-r from-primary to-secondary h-[380px] md:h-64 relative overflow-hidden">
            <img
              src="plane.gif"
              alt="Plane"
              className="absolute right-0 top-6 md:top-20 bottom-0 mb-0 mr-0 md:mr-4 w-[120px] md:w-[200px]"
            />
            {/* Desktop */}
            <div className="hidden md:flex container h-full gap-8 justify-center items-center relative z-10">
              <div className="bg-white w-[800px] shadow-lg rounded-lg p-8">
                <p className="text-main font-medium text-base">
                  Stay in the Loop and Never Miss Out on Our Newest,
                  Mouthwatering Recipes!
                </p>
                <div className="flex gap-2 items-center mt-4">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="border-2 border-primary text-main sm:text-sm rounded-full active:ring-primary active:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary block w-full py-2 px-3"
                    placeholder="Your email here"
                  />
                  <button className="bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary rounded-full px-8 py-2 text-base text-white font-semibold">
                    Subscribe
                  </button>
                </div>
              </div>
              {/* Title */}
              <div className="flex gap-4 mb-8">
                <div className="h-16 border-2 border-white"></div>
                <p className="text-3xl text-white font-semibold mt-1">
                  Subscribe to Get Latest Recipe
                </p>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex-col md:hidden container h-full gap-8 justify-center items-center p-8">
              {/* Title */}
              <div className="flex gap-4 mb-8">
                <div className="h-16 border-2 border-white"></div>
                <p className="text-2xl text-white font-semibold mt-1">
                  Subscribe to Get Latest Recipe
                </p>
              </div>
              <div className="bg-white w-full shadow-lg rounded-t-xl p-8">
                <p className="text-main font-medium text-base">
                  Stay in the Loop and Never Miss Out on Our Newest,
                  Mouthwatering Recipes!
                </p>
                <div className="flex flex-col gap-4 items-center mt-4">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="border-2 border-primary text-main sm:text-sm rounded-full active:ring-primary active:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary block w-full py-2 px-3"
                    placeholder="Your email here"
                  />
                  <button className="bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary rounded-full px-8 py-2 text-base text-white font-semibold w-full">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}

export default LandingPage;
