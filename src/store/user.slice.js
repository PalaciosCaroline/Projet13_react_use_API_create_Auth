import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userFirstName: '',
  userLastName: '',
  isAuthentificated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserFirstName: (state, action) => {
      state.userFirstName = action.payload;
    },
    setUserLastName: (state, action) => {
      state.userLastName = action.payload;
    },
    setIsAuthentificated: (state, action) => {
      state.isAuthentificated = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userFirstName = '';
      state.userLastName = '';
      state.isAuthentificated = false;
    },
  },
});

export const { setToken, setUserFirstName, setUserLastName, logout, setIsAuthentificated } = userSlice.actions;

export default userSlice.reducer;




