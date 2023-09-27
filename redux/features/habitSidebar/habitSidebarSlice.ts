import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SidebarState {
  isOpen: boolean;
  type: string;
  data?: any;
}

const initialState: SidebarState = {
  isOpen: false,
  type: "",
  data: {},
};



export const createHabit = createAsyncThunk(
  "habitSidebar/createHabit",
  async (habit: any) => {
    const API =
      process.env.API || "https://staging-api-health2023.agileteknik.com";
    const response = await axios.post(`${API}/v2/habbit`, habit);
    return response.data;
  }
);

export const updateHabit = createAsyncThunk(
  "habitSidebar/updateHabit",
  async (habit: any) => {
    const API =
      process.env.API || "https://staging-api-health2023.agileteknik.com";
    const response = await axios.put(`${API}/v2/habbit/${habit.id}`, habit);
    return response.data;
  }
);

export const deleteHabit = createAsyncThunk(
  "habitSidebar/deleteHabit",
  async (habit: any) => {
    const API =
      process.env.API || "https://staging-api-health2023.agileteknik.com";
    const response = await axios.delete(`${API}/v2/habbit/${habit.id}`);
    return response.data;
  }
);

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.data = action.payload.data;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
      state.type = "";
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createHabit.fulfilled, (state, action) => {
      state.isOpen = false;
      state.type = "";
      state.data = {};
    });
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
