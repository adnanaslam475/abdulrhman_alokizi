import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalContextProvider } from "./store/global-context";
import { store } from "./redux_toolkit/redux_store/store";
import { Provider } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <
    BrowserRouter basename = "/designer/dotnewPanel" >
    <
    Provider store = { store } >
    <
    GlobalContextProvider >
    <
    App / >
    <
    /GlobalContextProvider> <
    /Provider> <
    /BrowserRouter>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();