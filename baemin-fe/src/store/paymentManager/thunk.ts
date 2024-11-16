import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPayment } from "../../services/managePayment";
import { Payment } from "../../types/payment";

export const createPaymentThunk = createAsyncThunk(
  "createPayment",
  async (payload: Payment, { rejectWithValue }) => {
    try {
      const data = await createPayment.createPayment(payload);
      return data.status;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
