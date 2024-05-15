import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meal: [],
  mealId: null,
  mealSlider: [],
  mealDetail: null,
  category: [],
  categoryList: [],
  categoryName: null,
  searchKeyword: "",
  searchResults: [],
  favorites: {},
  userFavorites: [],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setMeal: (state, action) => {
      state.meal = action.payload;
    },
    setMealId: (state, action) => {
      state.mealId = action.payload;
    },
    setMealSlider: (state, action) => {
      state.mealSlider = action.payload;
    },
    setMealDetail: (state, action) => {
      state.mealDetail = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setCategoryName: (state, action) => {
      state.categoryName = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    addToFavorite: (state, action) => {
      const { meal, userEmail } = action.payload;
      state.favorites[userEmail].push(meal);
    },
    removeFromFavorite: (state, action) => {
      const { mealId, userEmail } = action.payload;
      if (state.favorites[userEmail]) {
        state.favorites[userEmail] = state.favorites[userEmail].filter(
          (meal) => meal.idMeal !== mealId
        );
      }
    },
    setUserFavorites: (state, action) => {
      state.userFavorites = action.payload;
    },
  },
});

export const {
  setMeal,
  setMealId,
  setMealSlider,
  setMealDetail,
  setCategory,
  setCategoryList,
  setCategoryName,
  setSearchKeyword,
  setSearchResults,
  setUserFavorites,
  addToFavorite,
  removeFromFavorite,
} = recipeSlice.actions;

export default recipeSlice.reducer;
