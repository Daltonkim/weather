import { combineReducers } from "redux";
import { weatherSlice } from "../modules/weather/_redux/weatherSlice";

export const rootReducer = combineReducers({
  weather: weatherSlice.reducer
});
