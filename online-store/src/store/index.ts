import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from './apiSlice';
import userSliceReducer, { userLogin } from './userSlice';

const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    [userLogin.reducerPath]: userLogin.reducer,
    user: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware).concat(userLogin.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
