import React, { FC } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import classes from './Layout.module.scss'

const Layout: FC = () => {
    return ( <>
    <Header />
    <div className={classes.container}>
      <Outlet />
      </div>
    <Footer />
    </> );
}
 
export default Layout;