import { createSlice} from '@reduxjs/toolkit';
import { addProductToApi } from '../productSlice';


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    products: [],
    users: [ { id: '1', name: 'Hamza Maqbool', email: 'Hamza.suri100@gmail.com' }],
    status: 'idle',
    error: null,
  },
  reducers: {
    // addProduct: (state, action) => {
    //   state.products.push(action.payload);
    // },
    // removeProduct: (state, action) => {
    //   state.products = state.products.filter(product => product.id !== action.payload.id);
    // },
    updateUser: (state, action) => {
      const { id, name, email } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      
      if (index !== -1) {
        state.users[index] = { id, name, email };
      } else {
        state.users.push({ id, name, email });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToApi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(addProductToApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateUser } = adminSlice.actions;
export default adminSlice.reducer;
