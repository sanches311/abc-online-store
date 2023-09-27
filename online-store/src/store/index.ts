import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from './apiSlice';

const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storeApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
