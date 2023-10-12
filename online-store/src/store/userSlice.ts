import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  id: number;
  title: string;
  size?: string | null;
  quantity: number;
  price: number;
}

interface IUserCart {
  currentUser: string[];
  cart: ICart[];
  favorites: ICart[];
}

const initialState: IUserCart = {
  currentUser: [],
  cart: [],
  favorites: [],
};

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
      state.favorites.push(action.payload);
    },
  },
});

export const { addProductToCart, addProductToFavorites } = userSlice.actions;
export default userSlice.reducer;
