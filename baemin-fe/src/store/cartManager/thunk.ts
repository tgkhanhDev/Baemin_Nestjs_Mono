import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageCart } from "../../services/manageCart";
import { Cart, Update } from "../../types/cart";

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

export const DeleteCartThunk = createAsyncThunk(
  "deleteCart",
  async (cartId: string, { rejectWithValue }) => {
    try {
      const data = await manageCart.deleteCart(cartId);
      return data.status;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const UpdateCartThunk = createAsyncThunk(
  "updateCart",
  async (payload: Update, { rejectWithValue }) => {
    try {
      const data = await manageCart.updateCart(payload);
      return data.status;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const EmptyCartThunk = createAsyncThunk(
  "emptyCart",
  async (accountId: string, { rejectWithValue }) => {
    try {
      const data = await manageCart.emptyCart(accountId);
      return data.status;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
