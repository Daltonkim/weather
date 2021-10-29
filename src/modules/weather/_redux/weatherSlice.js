import {createSlice} from "@reduxjs/toolkit";

const initialWeathersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  weatherServiceOne:undefined,
  weatherForServiceTwo: undefined,
  weatherForServiceOne:undefined,
  weatherForSevenDayForecastServiceOne: undefined,
  weatherForSevenDayForecastServiceTwo: undefined,
  suggestions: undefined,
  lastError: null
};

export const callTypes = {
  list: "list",
  action: "action"
};

export const weatherSlice = createSlice({
  name: "weathers",
  initialState: initialWeathersState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        console.log(action.payload.error.response)
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getWeatherByName
    weatherFetchedServiceOne: (state, action) => {
      state.actionsLoading = false;
      const { weatherForServiceOne } = action.payload;
      state.weatherForServiceOne = weatherForServiceOne;
      state.error = null;
    },

     // getWeatherByName
     weatherFetchedServiceTwo: (state, action) => {
      state.actionsLoading = false;
      const { weatherForServiceTwo} = action.payload;
      state.weatherForServiceTwo = weatherForServiceTwo;
      state.error = null;
    },
     // getWeatherByName
     weatherFetchedServiceOneSevenDayForecast: (state, action) => {
      state.actionsLoading = false;
      const { weatherForSevenDayForecastServiceOne } = action.payload;
      state.weatherForSevenDayForecastServiceOne = weatherForSevenDayForecastServiceOne;
      state.error = null;
    },

     // getWeatherByName
     weatherFetchedServiceTwoSevenDayForecast: (state, action) => {
      state.actionsLoading = false;
      const { weatherForSevenDayForecastServiceTwo} = action.payload;
      state.weatherForSevenDayForecastServiceTwo = weatherForSevenDayForecastServiceTwo;
      state.error = null;
    },
    // getWeatherByName
    allsuggestionsFetched: (state, action) => {
      const { suggestions } = action.payload;
      console.log(suggestions)
      state.listLoading = false;
      state.error = null;
      state.suggestions = suggestions;
    },

  }
});
