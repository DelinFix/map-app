import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { markersSlice } from "./slices/markersSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const rootReducer = combineReducers({
  markers: markersSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
