import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ICart {
  id: number;
  title: string;
  size?: string | null;
  quantity: number;
  price: number;
}

interface IUserCart {
  currentUser: IUser[];
  cart: ICart[];
  favorites: ICart[];
  loginForm: boolean;
}

const initialState: IUserCart = {
  currentUser: [],
  cart: [],
  favorites: [],
  loginForm: false,
};
interface IUser {
  username: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ICart>) => {
      const indexSameProduct = state.cart.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );
      if (indexSameProduct != -1) {
        state.cart[indexSameProduct].quantity =
          state.cart[indexSameProduct].quantity + action.payload.quantity;
      } else state.cart.push(action.payload);
    },
    addProductToFavorites: (state, action: PayloadAction<ICart>) => {
      const indexSameProduct = state.favorites.findIndex((item) => item.id === action.payload.id);
      if (indexSameProduct === -1) state.favorites.push(action.payload);
    },
    toggleUserLoginForm: (state, action: PayloadAction<boolean>) => {
      state.loginForm = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser.push(action.payload);
    },
    delCurrentUser: (state) => {
      state.currentUser.pop();
    },
  },
});

export const {
  addProductToCart,
  addProductToFavorites,
  toggleUserLoginForm,
  setCurrentUser,
  delCurrentUser,
} = userSlice.actions;
export default userSlice.reducer;

interface IParams {
  username: string;
  password: string;
}
interface IResponse {
  token: string;
}

export const userLogin = createApi({
  reducerPath: 'userLogin',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    userLogin: builder.mutation<IResponse, IParams>({
      query: (params) => ({
        url: 'auth/login',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useUserLoginMutation } = userLogin;
