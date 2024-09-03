import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import getTitle from "../../utils/app_title";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function MainLayout(): JSX.Element {
  const { pathname } = useLocation();
  const mainTitle = getTitle(pathname);
  return (
    <React.Fragment>
      <Helmet>
        <title>{mainTitle}</title>
      </Helmet>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default MainLayout;
