import { createSlice } from "@reduxjs/toolkit";
import {
  addCartItemThunk,
  ViewCartThunk,
  EmptyCartThunk,
  UpdateCartThunk,
} from "./thunk";
import { Cart, ViewCart } from "@/src/types/cart";
import { message } from "antd";

type StateType = {
  status: string;
  viewCart: ViewCart | null;
  loading: boolean;
};

const initialState: StateType = {
  status: "",
  viewCart: null,
  loading: false,
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
      })
      .addCase(ViewCartThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(ViewCartThunk.fulfilled, (state, { payload }) => {
        state.viewCart = payload;
        state.loading = false;
      })
      .addCase(EmptyCartThunk.fulfilled, (state) => {
        state.status = "success";
        state.viewCart = null;
      })
      .addCase(EmptyCartThunk.rejected, (state, { payload }) => {
        state.status = "failed";
      })
      .addCase(UpdateCartThunk.fulfilled, (state, { payload }) => {
        state.status = "failed";
        message.success("Cập nhật giỏ hàng thành công!");
      })
      .addCase(UpdateCartThunk.rejected, (state, { payload }) => {
        state.status = "failed";
        message.error("Cập nhật giỏ hàng thất bại! Vui lòng thử lại sau");
      });
  },
});

export const { reducer: manageCartReducer, actions: manageCartActions } =
  manageCartSlice;
