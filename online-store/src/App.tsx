import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/Pages/HomePage/HomePage';
import SingleProductPage from './components/Pages/SingleProductPage/SingleProductPage';
import ProductsPage from './components/Pages/ProductsPage/ProductsPage';
import CartPage from './components/Pages/CartPage/CartPage';
import FavoritesPage from './components/Pages/FavoritesPage/FavoritesPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products/:id" element={<SingleProductPage />} />
          <Route path="products/category/:category/products/:id" element={<SingleProductPage />} />
          <Route path="products/category/:category" element={<ProductsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
