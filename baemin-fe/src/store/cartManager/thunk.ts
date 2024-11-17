import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageCart } from "../../services/manageCart";
import { Cart } from "../../types/cart";

export const addCartItemThunk = createAsyncThunk(
  "addCartItem",
  async (payload: Cart, { rejectWithValue }) => {
    try {
      const data = await manageCart.addCartItem(payload);
      return data.status;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ViewCartThunk = createAsyncThunk(
  "viewCart",
  async (payload: string, { rejectWithValue }) => {
    try {
      const data = await manageCart.getCart(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
