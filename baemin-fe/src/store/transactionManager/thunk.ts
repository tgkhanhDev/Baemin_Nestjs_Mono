import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageTransaction } from "../../services/manageTransaction";

export const getTransaction = createAsyncThunk(
  "transaction",
  async (payment_id: string, { rejectWithValue }) => {
    try {
      const data = await manageTransaction.getTransaction(payment_id);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);
