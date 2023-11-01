import { createSlice } from "@reduxjs/toolkit";

interface GuestState {
  isGuest: any;
}

const initialState: GuestState = {
  isGuest: false,
};

export const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setGuest: (state, action) => {
      state.isGuest = action.payload;
    },
  },
});

export const { setGuest } = guestSlice.actions;
export default guestSlice.reducer;
