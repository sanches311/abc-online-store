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
}

const initialState: IUserCart = {
  currentUser: [],
  cart: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ICart>) => {
      state.cart.push(action.payload);
    },
  },
});

export const { addProductToCart } = userSlice.actions;
export default userSlice.reducer;
