import { createSlice } from "@reduxjs/toolkit";
import { createPaymentThunk } from "./thunk";
import { Payment } from "@/src/types/payment";
import { message } from "antd";

type StateType = {
  status: string;
};

const initialState: StateType = {
  status: "",
};

export const managePaymentSlice = createSlice({
  name: "managePayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentThunk.fulfilled, (state, { payload }) => {
        state.status = "success";
        message.success('Đặt hàng thành công');
        localStorage.removeItem("orderData")
      })
      .addCase(createPaymentThunk.rejected, (state, { payload }) => {
        state.status = "failed";
        message.error('Đặt hàng thất bại! Vui lòng thử lại sau');
      });
  },
});

export const { reducer: managePaymentReducer, actions: managePaymentActions } =
  managePaymentSlice;
