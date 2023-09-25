import { createSlice } from "@reduxjs/toolkit";

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
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
