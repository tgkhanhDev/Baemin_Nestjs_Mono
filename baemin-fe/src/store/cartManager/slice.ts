import { createSlice } from "@reduxjs/toolkit";
import { addCartItemThunk, ViewCartThunk } from "./thunk";
import { Cart, ViewCart } from "@/src/types/cart";
import { message } from "antd";

type StateType = {
  status: string;
  viewCart: ViewCart | null;
};

const initialState: StateType = {
  status: "",
  viewCart: null,
};

export const manageCartSlice = createSlice({
  name: "manageCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCartItemThunk.fulfilled, (state, { payload }) => {
        state.status = "success";
        message.success("Thêm vào giỏ hàng thành công");
      })
      .addCase(addCartItemThunk.rejected, (state, { payload }) => {
        state.status = "failed";
        message.error("Thêm vào giỏ hàng thất bại! Vui lòng thử lại sau");
      });
    builder.addCase(ViewCartThunk.fulfilled, (state, { payload }) => {
      state.viewCart = payload;
    });
  },
});

export const { reducer: manageCartReducer, actions: manageCartActions } =
  manageCartSlice;
