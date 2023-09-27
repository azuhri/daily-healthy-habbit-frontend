import { createSlice } from "@reduxjs/toolkit";

interface HabitsState {
  habits: any[];
  filteredHabits?: any[];
}

const initialState: HabitsState = {
  habits: [],
  filteredHabits: [],
};

export const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.habits = action.payload;
      state.filteredHabits = action.payload;
    },
    // temporarily filter habits by name
    filterHabits: (state, action) => {
      state.filteredHabits = state.habits.filter((habit) =>
        habit.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { setHabits, filterHabits } = habitsSlice.actions;
export default habitsSlice.reducer;