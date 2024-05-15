import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducers from "./reducers/authReducers";
import recipeReducers from "./reducers/recipeReducers";
import { createTransform } from "redux-persist";

const favoritesTransform = createTransform(
  (inboundState) => inboundState,
  (outboundState) => outboundState,
  { whitelist: ["recipe"] }
);

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducers,
  recipe: recipeReducers,
});

// Configure redux-persist
const persistConfig = {
  key: "root",
  storage,
  transforms: [favoritesTransform],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
});

// Create the Redux persistor
export const persistor = persistStore(store);
