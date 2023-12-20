import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Navigation from '../Navigation/Navigation';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Breadcrumbs />
      <main className={classes.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
