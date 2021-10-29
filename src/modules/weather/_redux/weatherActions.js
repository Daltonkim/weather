import * as requestFromServer from "./weatherCrud";
import { weatherSlice, callTypes } from "./weatherSlice";

const { actions } = weatherSlice;


export const fetchWeatherServiceOne = name => dispatch => {
  if (!name) {
    return dispatch(actions.weatherFetchedServiceOne({ weatherForServiceOne: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getWeatherByNameServiceOne(name)
    .then(response => {
      dispatch(actions.weatherFetchedServiceOne({ weatherForServiceOne: response.data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find weather";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchWeatherServiceTwo = (lat, lng) => dispatch => {
  if (!(lat && lng)) {
    return dispatch(actions.weatherFetchedServiceTwo({ weatherForServiceTwo: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getWeatherByNameServiceTwo(lat, lng)
    .then(response => {
      const { data: { timelines } } = response.data
      dispatch(actions.weatherFetchedServiceTwo({ weatherForServiceTwo: timelines && timelines[0]?.intervals[0].values }));
    })
    .catch(error => {
      error.clientMessage = "Can't find weather";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchSevenDayForeCastServiceOne = (lat, long) => dispatch => {
  if (!(lat && long)) {
    return dispatch(actions.weatherFetchedServiceOneSevenDayForecast({ weatherForSevenDayForecastServiceOne: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSevenDayForecastByNameServiceOne(lat, long)
    .then(response => {
      const { daily } = response.data
      const changeData = daily && daily.slice(0,4).map(item => {
        return (
          item?.temp.day
        )
      })
      dispatch(actions.weatherFetchedServiceOneSevenDayForecast({ weatherForSevenDayForecastServiceOne: changeData }));
    })
    .catch(error => {
      error.clientMessage = "Can't find weather";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchSevenDayForeCastServiceTwo = (lat, long) => dispatch => {
  if (!(lat && long)) {
    return dispatch(actions.weatherFetchedServiceTwoSevenDayForecast({ weatherForSevenDayForecastServiceTwo: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSevenDayForecastByNameServiceTwo(lat, long)
    .then(response => {
      const { data: { timelines } } = response.data
      const changeData = timelines && timelines[0]?.intervals.slice(0,4).map(item => {
        return (
          item?.values.temperature
        )
      })
      dispatch(actions.weatherFetchedServiceTwoSevenDayForecast({ weatherForSevenDayForecastServiceTwo: changeData }));
    })
    .catch(error => {
      error.clientMessage = "Can't find weather";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


export const fetchAllSuggestions = name => dispatch => {
  if (!name) {
    return dispatch(actions.allsuggestionsFetched({ suggestions: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAllSuggestions(name)
    .then(response => {
      const { list } = response.data;
      dispatch(actions.allsuggestionsFetched({ suggestions: list && list }));
    })
    .catch(error => {
      error.clientMessage = "Can't find weather";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
