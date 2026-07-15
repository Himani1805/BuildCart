import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Asynchronous thunk action for login authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // Fetching users from the mock json-server
      const response = await axiosInstance.get('/users');
      const users = response.data;

      // Validating credentials against the mock database
      const user = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        // Simulating a token generation for authentication matching
        const token = 'mock_jwt_token_for_' + user.email;
        
        // Persisting login session in browser local storage
        localStorage.setItem('buildcart_token', token);
        localStorage.setItem('buildcart_user', JSON.stringify(user));

        return { user, token };
      } else {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Server error occurred');
    }
  }
);

// Initial state initialization checking local storage context
const initialState = {
  user: JSON.parse(localStorage.getItem('buildcart_user')) || null,
  token: localStorage.getItem('buildcart_token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous action to logout user and clean data layers
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('buildcart_token');
      localStorage.removeItem('buildcart_user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;