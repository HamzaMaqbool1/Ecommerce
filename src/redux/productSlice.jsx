import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  items: [],
  product: {},
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  }
);

export const addProductToApi = createAsyncThunk(  
  'products/addProductToApi',
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);
      console.log('Received response from API:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addProductToApi.pending, (state) => {
        state.status = 'loading';
      })
     .addCase(addProductToApi.fulfilled, (state, action) => {
      console.log('Before pushing:', action.payload);
      state.status = 'succeeded';
      state.items.push(action.payload);
      console.log('After pushing:', action.payload);
})
      .addCase(addProductToApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default ProductSlice.reducer;
