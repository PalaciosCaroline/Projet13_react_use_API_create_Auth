import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: 'JarvisT',
	  name:'Toto',
	// isAuthentificated: false,
	  isAuthentificated: true,
    token: "",
  },
  reducers: {
	setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
	setIsAuthentificated: (state, action) => {
      state.isAuthentificated = action.payload;
    },
  },
});

export const { setFirstName, setName, setToken, setIsAuthentificated } = userSlice.actions;
export const userReducer = userSlice.reducer;
