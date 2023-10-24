import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ICart {
  id: number;
  img: string;
  title: string;
  size?: string | null;
  color?: string;
  quantity: number;
  price: number;
  description: string;
}

interface IUserCart {
  currentUser: IUser[];
  cart: ICart[];
  favorites: ICart[];
  loginForm: boolean;
  SignInForm: boolean;
}

const initialState: IUserCart = {
  currentUser: [],
  cart: [],
  favorites: [],
  loginForm: false,
  SignInForm: false,
};
interface IUser {
  username: string;
}
interface INewUserReq {
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number | null;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}
interface INewUserResp {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}
export interface IQuantity {
  id: number;
  quantity: number;
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
        if (
          state.cart[indexSameProduct].size === action.payload.size &&
          state.cart[indexSameProduct].color === action.payload.color
        )
          state.cart[indexSameProduct].quantity =
            state.cart[indexSameProduct].quantity + action.payload.quantity;
      } else state.cart.push(action.payload);
    },
    delProductCart: (state, action: PayloadAction<ICart>) => {
      const newCart = state.cart.filter((product) => {
        if (product.id != action.payload.id) return true;
        else if (product.size != action.payload.size) return true;
        else if (product.color != action.payload.color) return true;
        else return false;
      });
      state.cart = newCart;
    },
    incProductQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((product) => product.id === action.payload);
      state.cart[index].quantity = state.cart[index].quantity + 1;
    },
    descProductQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((product) => product.id === action.payload);
      if (state.cart[index].quantity > 1)
        state.cart[index].quantity = state.cart[index].quantity - 1;
    },
    setProductQuantity: (state, action: PayloadAction<IQuantity>) => {
      const index = state.cart.findIndex((product) => product.id === action.payload.id);
      state.cart[index].quantity = action.payload.quantity;
    },
    addProductToFavorites: (state, action: PayloadAction<ICart>) => {
      const indexSameProduct = state.favorites.findIndex((item) => item.id === action.payload.id);
      if (indexSameProduct === -1) state.favorites.push(action.payload);
    },
    toggleUserLoginForm: (state, action: PayloadAction<boolean>) => {
      state.loginForm = action.payload;
    },
    toggleUserSignInForm: (state, action: PayloadAction<boolean>) => {
      state.SignInForm = action.payload;
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
  delProductCart,
  incProductQuantity,
  descProductQuantity,
  setProductQuantity,
  addProductToFavorites,
  toggleUserLoginForm,
  toggleUserSignInForm,
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

export const user = createApi({
  reducerPath: 'userLogin',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    userLogin: builder.mutation<IResponse, IParams>({
      query: (params) => ({
        url: 'auth/login',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['User'],
    }),
    userSignIn: builder.mutation<INewUserResp, INewUserReq>({
      query: (params) => ({
        url: 'users',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserSignInMutation } = user;
