import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/Pages/HomePage/HomePage';
import SingleProductPage from './components/Pages/SingleProductPage/SingleProductPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products/:id" element={<SingleProductPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
