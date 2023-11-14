import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/products';
import { ISearchParams } from '../interfaces/searchParams';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IParamsCategory {
  category: string;
  searchParams: ISearchParams;
}
interface IApp {
  currentProduct: IProduct[];
}
const initialState: IApp = {
  currentProduct: [],
};

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Array<string>, void>({
      query: () => `products/categories`,
    }),
    getAllProducts: builder.query<Array<IProduct>, ISearchParams>({
      query: (searchParams) =>
        `products1?${searchParams.sort ? `sort=${searchParams.sort}` : ''}${
          searchParams.limit ? `&limit=${searchParams.limit}` : ''
        }${searchParams.query ? `&query=${searchParams.query}` : ''}`,
    }),
    getSingleProduct: builder.query<IProduct, string>({
      query: (id) => `products/${id}`,
    }),
    getProductsCategory: builder.query<IProduct[], IParamsCategory>({
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

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProductApp: (state, action: PayloadAction<IProduct[]>) => {
      state.currentProduct = action.payload;
    },
  },
});

export const { setProductApp } = appSlice.actions;
export default appSlice.reducer;
