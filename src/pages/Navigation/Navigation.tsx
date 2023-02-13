import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import cx from "./Navigation.module.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Navigation() {
  let location = useLocation();
  return (
    <Fragment>
      <div
        className={`${
          location.pathname.length <= 1 ? cx.wrapperLogin : cx.wrapper
        }`}
      >
        {location.pathname.length <= 1 ? <Fragment></Fragment> : <Header />}
        {location.pathname.length <= 1 ? <Fragment></Fragment> : <Sidebar />}

        <Outlet />
        {location.pathname.length <= 1 ? <Fragment></Fragment> : <Footer />}
      </div>
    </Fragment>
  );
}
