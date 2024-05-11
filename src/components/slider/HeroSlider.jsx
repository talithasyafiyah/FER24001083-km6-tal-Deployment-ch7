import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getMealSlider } from "../../redux/actions/recipeActions";

function Login() {
  const dispatch = useDispatch();
  const slider = useSelector((state) => state?.recipe.mealSlider);

  useEffect(() => {
    dispatch(getMealSlider());
  }, []);

  const settings = {
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
    <>
      {slider.length > 0 && (
        <Slider {...settings}>
          {slider.map((e, index) => (
            <div key={index} className="h-screen relative">
              <img
                className="w-full h-screen object-cover"
                src={e?.image}
                alt={`Slide ${index}`}
              />
              <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}

export default Login;
