import axios from "axios";
const moment = require('moment')

export const WEATHER_MODULE_URL = "weather";
export const FIND_MODULE_URL = "find";
export const ONECALL_MODULE_URL = "onecall";
export const TOMORROW_MODULE_URL = "timelines";

var date = new Date();

const start = moment.utc(new Date()).format()
const end = moment.utc(date.setDate(date.getDate() + 4)).format();

console.log(start, end);


// READ
export function getAllSuggestions(name) {
  return axios.get(`${process.env.REACT_APP_API_BASE}/${FIND_MODULE_URL}?q=${name}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
}

export function getWeatherByNameServiceOne(weatherName) {
  return axios.get(`${process.env.REACT_APP_API_BASE}/${WEATHER_MODULE_URL}?q=${weatherName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
}

export function getWeatherByNameServiceTwo(lat, lng) {
  return axios.get(`${process.env.REACT_APP_API_BASE_2}/${TOMORROW_MODULE_URL}?apikey=${process.env.REACT_APP_API_KEY_2}&location=${lat},${lng}&startTime=${start}&endTime=${end}&fields=temperature,windSpeed,windGust,cloudCover,precipitationIntensity&timesteps=1d`);
}

export function getSevenDayForecastByNameServiceOne(lat, lon) {
  return axios.get(`${process.env.REACT_APP_API_BASE}/${ONECALL_MODULE_URL}?lat=${lat}&lon=${lon}&exclude=hourly,current&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
}

export function getSevenDayForecastByNameServiceTwo(lat, lng) {
  return axios.get(`${process.env.REACT_APP_API_BASE_2}/${TOMORROW_MODULE_URL}?apikey=${process.env.REACT_APP_API_KEY_2}&location=${lat},${lng}&startTime=${start}&endTime=${end}&fields=temperature,windSpeed,cloudCover,precipitationIntensity&timesteps=1d`);
}
