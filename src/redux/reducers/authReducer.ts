import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { localDataNames } from "../../constant/appInfor";

export interface AuthState {
  token: string;
  _id: string;
  name: string;
  rule: number;
}

const initialState = {
  token: "",
  _id: "",
  name: "",
  rule: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.data = action.payload;
      syncLocal(action.payload);
    },
    removeAuth: (state, _action) => {
      state.data = initialState;
      syncLocal({});
    },
    refreshToken: (state, action) => {
      state.data.token = action.payload;
      syncLocal(state.data); // Cập nhật token mới vào cookies
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, refreshToken } = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.data;

const syncLocal = (data: any) => {
  if (data && data.token) {
    // Lưu thông tin auth vào cookies
    Cookies.set(localDataNames.authData, JSON.stringify(data), { expires: 7 }); // expires: 7 ngày
  } else {
    // Xóa thông tin auth khỏi cookies
    Cookies.remove(localDataNames.authData);
  }
};
