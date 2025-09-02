import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@shared/schema';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: {
    id: 1,
    username: 'john.smith',
    email: 'john.smith@company.com',
    password: '',
    role: 'admin',
    isActive: true,
    createdAt: new Date(),
  },
  isAuthenticated: true,
  isAdmin: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === 'admin';
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
