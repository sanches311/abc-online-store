import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/products';
import { ISearchParams } from '../interfaces/searchParams';

interface IparamsCategory {
  category: string;
  searchParams: ISearchParams;
}

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Array<string>, void>({
      query: () => `products/categories/`,
    }),
    getAllProducts: builder.query<Array<IProduct>, ISearchParams>({
      query: (searchParams) =>
        `products?${searchParams.sort ? `sort=${searchParams.sort}` : ''}${
          searchParams.limit ? `&limit=${searchParams.limit}` : ''
        }${searchParams.query ? `&query=${searchParams.query}` : ''}`,
    }),
    getSingleProduct: builder.query<IProduct, string>({
      query: (id) => `products/${id}`,
    }),
    getProductsCategory: builder.query<IProduct[], IparamsCategory>({
      query: ({ category, searchParams }) =>
        `products/category/${category}?${searchParams.sort ? `sort=${searchParams.sort}` : ''}${
          searchParams.limit ? `&limit=${searchParams.limit}` : ''
        }${searchParams.query ? `&query=${searchParams.query}` : ''}`,
    }),
  }),
});
export const {
  useGetAllCategoriesQuery,
  useGetSingleProductQuery,
  useGetAllProductsQuery,
  useGetProductsCategoryQuery,
} = storeApi;
