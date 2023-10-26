import Layout from '../Layout/Layout';
import HomePage from '../Pages/HomePage/HomePage';
import SingleProductPage from '../Pages/SingleProductPage/SingleProductPage';
import CartPage from '../Pages/CartPage/CartPage';
import FavoritesPage from '../Pages/FavoritesPage/FavoritesPage';
import ProductsPage from '../Pages/ProductsPage/ProductsPage';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        breadcrumb: 'Home',
      },
      {
        path: 'products/:id',
        element: <SingleProductPage />,
        breadcrumb: 'Products',
      },
      {
        path: 'products/category/:category',
        element: <ProductsPage />,
        breadcrumbs: 'Category',
      },
      {
        path: 'cart',
        element: <CartPage />,
        breadcrumbs: 'Cart',
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
        breadcrumbs: 'Favorites',
      },
    ],
  },
];
