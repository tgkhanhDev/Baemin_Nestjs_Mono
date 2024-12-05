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

export const getPaymentByAccountIdThunk = createAsyncThunk(
  "getPaymentByAccountId",
  async (payload: string, { rejectWithValue }) => {
    try {
      const data = await createPayment.getPaymentById(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const payForPaymentThunk = createAsyncThunk(
  "payForPayment",
  async (payment_id: string, { rejectWithValue }) => {
    try {
      const data = await createPayment.payForPayment(payment_id);
      return data.status;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
