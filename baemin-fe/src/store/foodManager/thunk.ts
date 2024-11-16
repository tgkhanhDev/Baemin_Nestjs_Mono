import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageFood } from "../../services/manageFood";
import { Food } from "../../types/food";

export const getFoodThunk = createAsyncThunk(
  "food",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageFood.getFood();
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);