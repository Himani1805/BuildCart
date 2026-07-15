import { createSlice } from '@reduxjs/toolkit';

// Initial baseline data schema allocations structural tracking parameters mapping dictionary 
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

// Internal utility helper algorithm functions calculation logic wrapper framework map parameters 
const calculateCartTotals = (state) => {
  let quantityCount = 0;
  let amountCount = 0;
  
  state.cartItems.forEach((item) => {
    quantityCount += item.quantity;
    amountCount += item.price * item.quantity;
  });

  state.totalQuantity = quantityCount;
  state.totalAmount = amountCount;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action mutator logic implementation to handle dynamic item array insertions elements properties
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          category: newItem.category,
          unit: newItem.unit,
          stock: newItem.stock,
          image: newItem.image,
          quantity: 1,
        });
      } else {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity++;
        }
      }
      calculateCartTotals(state);
    },

    // Action control processing to execute multi quantity manual decrement adjustments configurations 
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
      }
      calculateCartTotals(state);
    },

    // Action parameters array indexing mutation handler to execute total raw target records removals 
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      calculateCartTotals(state);
    },

    // Global pipeline order processing resolution tracking context variable reset data clear action 
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;