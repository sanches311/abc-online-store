import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage/HomePage';
import SingleProductPage from '../pages/SingleProductPage/SingleProductPage';
import DynamicProductBreadcrumb from '../components/Breadcrumbs/DynamicProductBreadcrumb';
import ProductsPageByCategory from '../pages/ProductsPageByCategory/ProductsPageByCategory';
import ProductsAllPage from '../pages/ProductsAll/ProductsAllPage';
import DynamicCategoryBreadcrumb from '../components/Breadcrumbs/DynamicCategoryBreadcrumb';
import BagShoppingPage from '../pages/BagShoppingPage/BagShoppingPage';
import WishListPage from '../pages/WishListPage/WishListPage';
import UserOrders from '../pages/UserOrdersPage/UserOrdersPage';
import RequireAth from '../hoc/RequireAuth';
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
        breadcrumb: DynamicCategoryBreadcrumb,
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
        path: '/bag',
        element: <BagShoppingPage />,
        breadcrumb: 'Shopping Bag',
      },
      {
        path: '/orders/user/:userId',
        element: (
          <RequireAth>
            <UserOrders />
          </RequireAth>
        ),
        breadcrumb: null,
      },
      {
        path: '/wishlist',
        element: <WishListPage />,
      },
    ],
  },
];
