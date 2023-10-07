import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getServerSideProps } from "@/lib/getSession";

const API = process.env.API || "https://staging-api-health2023.agileteknik.com";

interface SidebarState {
  isOpen: boolean;
  type: string;
  index?: number;
}

const initialState: SidebarState = {
  isOpen: false,
  type: "",
  index: 0,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.index = action.payload.index;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
      state.type = "";
      state.index = -1;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
export { getServerSideProps };
