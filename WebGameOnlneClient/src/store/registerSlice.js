import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "../api/User";

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const response = await UserAPI.register(userData);
    // Xử lý phản hồi từ máy chủ và trả về dữ liệu
    return response.data;
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi
    throw new Error(error.message);
  }
});

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.successMessage = "Đăng ký thành công!";
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default registerSlice.reducer;
