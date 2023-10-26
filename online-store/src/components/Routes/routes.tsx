import Layout from '../Layout/Layout';
import HomePage from '../Pages/HomePage/HomePage';
import SingleProductPage from '../Pages/SingleProductPage/SingleProductPage';
import CartPage from '../Pages/CartPage/CartPage';
import FavoritesPage from '../Pages/FavoritesPage/FavoritesPage';
import ProductsPage from '../Pages/ProductsPage/ProductsPage';
import Home from '../../assets/home.svg';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    breadcrumb: null,
    children: [
      {
        index: true,
        element: <HomePage />,
        breadcrumb: { Home },
      },
      {
        path: 'products',
        breadcrumb: null,
      },
      {
        path: 'products/:id',
        element: <SingleProductPage />,
        breadcrumb: 'ProductBreadcrumb',
      },
      {
        path: '/products/category/:category',
        element: <ProductsPage />,
        breadcrumbs: 'CategoryBreadcrumb',
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
