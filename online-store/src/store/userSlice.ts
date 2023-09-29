import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/index';

interface ICart {
  id: number;
  title: string;
  size?: string | null;
  quantity: number;
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
