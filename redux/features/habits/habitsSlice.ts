import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface HabitsState {
  habits: any[];
  filteredHabits?: any[];
}

const initialState: HabitsState = {
  habits: [],
  filteredHabits: [],
};

const API = process.env.API || "https://staging-api-health2023.agileteknik.com";

export const createHabit = createAsyncThunk(
  "habitSidebar/createHabit",
  async (habit: any, access_token: any) => {
    const response = await axios.post(`${API}/v2/habbit`, habit, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  }
);

export const updateHabit = createAsyncThunk(
  "habitSidebar/updateHabit",
  async ({ habit, access_token }: { habit: any; access_token: string }) => {
    const habitTemp = { ...habit, alarm_code: 1 };

    const response = await axios.put(
      `${API}/v2/habbit/${habitTemp.id}`,
      habitTemp,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteHabit = createAsyncThunk(
  "habitSidebar/deleteHabit",
  async ({ id, access_token }: { id: string; access_token: string }) => {
    const response = await axios.delete(`${API}/v2/habbit/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  }
);

export const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.habits = action.payload;
      state.filteredHabits = action.payload;
    },
    filterHabits: (state, action) => {
      state.filteredHabits = state.habits.filter(
        (habit) =>
          habit.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          (habit.description &&
            habit.description
              .toLowerCase()
              .includes(action.payload.toLowerCase()))
      );
    },
  },
});

export const { setHabits, filterHabits } = habitsSlice.actions;
export default habitsSlice.reducer;
