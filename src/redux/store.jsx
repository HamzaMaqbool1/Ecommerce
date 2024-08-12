// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartslice';
import orderReducer from './slices/orderslice';
import adminReducer from './slices/adminslice';
import productReducer from './productSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    admin: adminReducer,
    products:productReducer
  },
});
