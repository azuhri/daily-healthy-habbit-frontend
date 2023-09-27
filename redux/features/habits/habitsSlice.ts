import { createSlice } from "@reduxjs/toolkit";

interface HabitState {
  habits: any[];
}

const initialState: HabitState = {
  habits: [],
};

export const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.habits = action.payload;
    },
  },
});

export const { setHabits } = habitsSlice.actions;
export default habitsSlice.reducer;
