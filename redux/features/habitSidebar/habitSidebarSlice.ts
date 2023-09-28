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
  index: -1,
};

// export const createHabit = createAsyncThunk(
//   "habitSidebar/createHabit",
//   async (habit: any, access_token) => {
//     // const response = await axios.post(`${API}/v2/habbit`, habit, {
//     //   headers: {
//     //     Authorization: `Bearer ${access_token}`,
//     //   },
//     // });
//     const response = await fetch(`${API}/v2/habbit`, {
//       method: "POST",
//       mode: "no-cors",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${access_token}`,
//       },
//       body: JSON.stringify(habit),
//     });
//     console.log(response);
//   }
// );

// export const updateHabit = createAsyncThunk(
//   "habitSidebar/updateHabit",
//   async (habit: any) => {
//     const response = await axios.put(`${API}/v2/habbit/${habit.id}`, habit);
//     return response.data;
//   }
// );

// export const deleteHabit = createAsyncThunk(
//   "habitSidebar/deleteHabit",
//   async (habit: any) => {
//     const response = await axios.delete(`${API}/v2/habbit/${habit.id}`);
//     return response.data;
//   }
// );

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
