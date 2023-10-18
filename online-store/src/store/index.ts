import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from './apiSlice';
import userSliceReducer, { user } from './userSlice';

const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    [user.reducerPath]: user.reducer,
    user: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware).concat(user.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
