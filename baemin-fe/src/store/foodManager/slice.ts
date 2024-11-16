import { createSlice } from "@reduxjs/toolkit";
import {
  getFoodThunk
} from "./thunk";

type stateType = {
  food: any;
};

const initialState: stateType = {
  food: [],
};

export const manageFoodSlice = createSlice({
  name: "manageFood",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFoodThunk.fulfilled, (state, { payload }) => {
      state.food = payload;
    });
  },
});

export const { reducer: manageFoodReducer, actions: manageFoodActions } =
  manageFoodSlice;
