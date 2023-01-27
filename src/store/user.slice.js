import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  firstName: 'Tata!',
  lastName: '',
  isAuthentificated: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setIsAuthentificated: (state, action) => {
      state.name = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.firstName = '';
      state.lastName = '';
      state.isAuthentificated = false;
    },
  },
});

export const { setToken, setUserFirstName, setUserName, logout, setIsAuthentificated } = userSlice.actions;

export default userSlice.reducer;




