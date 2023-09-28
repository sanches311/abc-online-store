import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/products';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Array<string>, void>({
      query: () => 'products/categories',
    }),
    getAllProducts: builder.query<Array<IProduct>, void>({
      query: () => `products`,
    }),
    getSingleProduct: builder.query<IProduct, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});
export const { useGetAllCategoriesQuery, useGetSingleProductQuery, useGetAllProductsQuery } =
  storeApi;
