import { createSlice } from "@reduxjs/toolkit";
import { getShopThunk, getShopDetailThunk } from "./thunk";
import { ShopDetail } from "@/src/types/shop";

type stateType = {
  shop: any;
  shopDetail: ShopDetail | null;
};

const initialState: stateType = {
  shop: [],
  shopDetail: null,
};

export const manageShopSlice = createSlice({
  name: "manageShop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShopThunk.fulfilled, (state, { payload }) => {
      state.shop = payload;
    });
    builder.addCase(getShopDetailThunk.fulfilled, (state, { payload }) => {      
      state.shopDetail = payload;
    });
  },
});

export const { reducer: manageShopReducer, actions: manageShopActions } =
  manageShopSlice;
