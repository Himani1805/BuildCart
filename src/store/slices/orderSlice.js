import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ordersList: JSON.parse(localStorage.getItem('buildcart_orders')) || [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.ordersList.unshift(action.payload);
      localStorage.setItem('buildcart_orders', JSON.stringify(state.ordersList));
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;