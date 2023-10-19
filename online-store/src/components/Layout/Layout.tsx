import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className={classes.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
