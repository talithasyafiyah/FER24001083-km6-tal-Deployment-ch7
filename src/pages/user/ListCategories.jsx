import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/navigations/Navbar";
import Footer from "../../components/navigations/Footer";
import Slider from "../../components/slider/HeaderSlider";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList } from "../../redux/actions/recipeActions";
import { setMealId } from "../../redux/reducers/recipeReducers";
import Card from "../../components/Card";

function ListCategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const categoryName = useSelector((state) => state?.recipe.categoryName);
  const data = useSelector((state) => state.recipe.categoryList);

  useEffect(() => {
    dispatch(getCategoryList())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(true));
  }, [dispatch, navigate]);

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
          <div className="relative h-[160px] md:h-[280px] overflow-x-hidden overflow-y-hidden">
            <div className="w-full h-[280px] absolute top-0">
              <Slider />
            </div>
          </div>

          {/* Card Section */}
          <section id="card" className="container mt-6 mb-20">
            <h1 className="text-lg text-left font-bold text-main mb-4">
              Showing {data.length} results for{" "}
              <span className="text-secondary">"{categoryName}"</span>
            </h1>
            <Card isLoading={isLoading} data={data} />
          </section>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default ListCategories;
