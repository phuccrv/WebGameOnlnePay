import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "../api/User";

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await UserAPI.login(userData);
    console.log(response.data);
    localStorage.setItem("userLogin", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: "",
    token: "",
    isLoggedIn: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
      state.token = action.payload.accessToken;
      state.isLoggedIn = true;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
