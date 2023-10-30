import Layout from '../Layout/Layout';
import HomePage from '../Pages/HomePage/HomePage';
import SingleProductPage from '../Pages/SingleProductPage/SingleProductPage';
import CartPage from '../Pages/CartPage/CartPage';
import FavoritesPage from '../Pages/FavoritesPage/FavoritesPage';
import DynamicProductBreadcrumb from '../Breadcrumbs/DynamicProductBreadcrumb';
import ProductsPageByCategory from '../Pages/ProductsPageByCategory/ProductsPageByCategory';
import ProductsAllPage from '../Pages/ProductsAll/ProductsAllPage';

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
        path: ':category',
        element: <ProductsPageByCategory />,
        //breadcrumb: 'CategoryBreadcrumb',
      },
      {
        path: '/products',
        element: <ProductsAllPage />,
        breadcrumb: 'All products',
      },
      {
        path: '/products/:id',
        element: <SingleProductPage />,
        breadcrumb: DynamicProductBreadcrumb,
      },

      {
        path: '/cart',
        element: <CartPage />,
        breadcrumbs: 'Cart',
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
        breadcrumbs: 'Favorites',
      },
    ],
  },
];
