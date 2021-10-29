import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import { weatherSlice } from "../modules/weather/_redux/weatherSlice";

export const rootReducer = combineReducers({
  weather: weatherSlice.reducer
});

export function* rootSaga() {
  yield all([weatherSlice.saga()]);
}
