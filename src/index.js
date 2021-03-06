import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/style.scss';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store, { persistor } from "./redux/store";

const { PUBLIC_URL } = process.env;

ReactDOM.render(
  <React.StrictMode>
    <App store={store} persistor={persistor} basename={PUBLIC_URL} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
