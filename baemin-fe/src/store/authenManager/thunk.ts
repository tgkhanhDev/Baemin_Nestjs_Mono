import { createAsyncThunk } from "@reduxjs/toolkit";
import { Food } from "../../types/food";
import { LoginRequest, RegisterRequest, UpdateInfo } from "@/src/types/auth";
import { manageAuthentication } from "@/src/services/manageAuthentication";
import { toast } from "react-toastify";

export const loginThunk = createAsyncThunk(
  "login",
  async (req: LoginRequest, { rejectWithValue }) => {
    try {
      const data = await manageAuthentication.login(req)
      return data.data
    } catch (error) {
      console.log("API error:", error);
      toast.error("Your email or password may be incorrect, please try again");

      return rejectWithValue(error);
    }
  }
);


export const registerThunk = createAsyncThunk(
  "register",
  async (req: RegisterRequest, { rejectWithValue }) => {
    try {
      const data = await manageAuthentication.register(req)
      return data.data
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
)

export const getUserInfoThunk = createAsyncThunk(
  "getInfo",
  async (userId: string, { rejectWithValue }) => {
    try {
      console.log("userIdThunk", userId);
      
      const data = await manageAuthentication.getUserInfo(userId)
      return data.data
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
)

export const updateInfoThunk = createAsyncThunk(
  "updateInfo",
  async (req: UpdateInfo, { rejectWithValue }) => {
    try { 
      const data = await manageAuthentication.updateInfo(req)
      return data.data
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
)