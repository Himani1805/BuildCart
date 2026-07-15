import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Asynchronous action thunk to fetch complete product collection arrays from backend service
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Direct integration Axios GET execution to fetch inventory materials records
      const response = await axiosInstance.get('/products');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Inventory database connection timeout occurred.');
    }
  }
);

// Baseline structural configuration metadata object repository parameters initialization
const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;