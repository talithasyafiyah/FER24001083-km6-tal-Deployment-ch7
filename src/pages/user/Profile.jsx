import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navigations/Navbar";
import Footer from "../../components/navigations/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProgressBar } from "react-loader-spinner";
import { setMealId } from "../../redux/reducers/recipeReducers";
import { useDispatch, useSelector } from "react-redux";
import {
  getMealSlider,
  getUserFavorites,
} from "../../redux/actions/recipeActions";
import Card from "../../components/Card";

function Profile() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const data = useSelector((state) => state?.recipe.userFavorites);
  const user = useSelector((state) => state?.auth.user);
  const userEmail = useSelector((state) => state?.auth?.user?.email);
  const slider = useSelector((state) => state?.recipe.mealSlider);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    dispatch(getUserFavorites(userEmail));
  }, [dispatch, userEmail]);

  let profileImage = null;

  if (user && user.picture) {
    profileImage = (
      <img
        src={user.picture.data ? user.picture.data.url : user.picture}
        alt="Profile picture"
        className="rounded-full w-[80px] md:w-[100px]"
      />
    );
  } else {
    profileImage = (
      <img
        src="person.svg"
        alt="Person Icon"
        className="w-[80px] md:w-[100px]"
      />
    );
  }

  useEffect(() => {
    dispatch(getMealSlider());
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    speed: 4800,
    autoplaySpeed: 4800,
    fade: true,
    waitForAnimate: false,
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <img src="/loading.gif" alt="loading..." />
        </div>
      ) : (
        <div>
          <Navbar transparent={true} />

          {/* Profile */}
          <div className="relative h-[260px] overflow-x-hidden overflow-y-hidden">
            <div className="absolute top-[55%] left-1/2 md:left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10 w-3/4 md:w-1/2">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                {profileImage}
                <div className="text-white text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                    {user && user.name}
                  </h1>
                  <p className="text-base">{user && user.email}</p>
                </div>
              </div>
            </div>
            <div className="w-full h-[260px] absolute top-0">
              {slider.length > 0 && (
                <Slider {...settings}>
                  {slider.map((e, index) => (
                    <div key={index} className="h-[280px] relative">
                      <img
                        className="w-full h-full object-cover"
                        src={e?.image}
                        alt={`Slide ${index}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C] from-40% via-main/80 to-main/20"></div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>

          {/* Tab */}
          <div className="container border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-text-color">
              <li className="me-2">
                <a className="cursor-pointer inline-flex items-center justify-center p-4 text-base font-semibold border-b-2 rounded-t-lg text-primary border-primary">
                  Favorite
                </a>
              </li>
            </ul>
          </div>

          <section id="card" className="container mt-6 md:mt-4 mb-16">
            <div>
              {Array.isArray(data) && data.length > 0 && (
                <h2 className="text-base text-left font-semibold text-main mb-4">
                  Showing {data.length} results of your favorite recipes.
                </h2>
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

export default Profile;
