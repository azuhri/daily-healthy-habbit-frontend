import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

interface TimeState {
  currentTime: moment.Moment;
  date?: string;
}

const initialState: TimeState = {
  currentTime: moment(),
  date: moment().format("YYYY-MM-DD"),
};

const timeStateSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    changeDate: (state, action) => {
      const format = moment(action.payload.date).format("YYYY-MM-DD");
      state.date = format;
    },
  },
});

export const { changeDate } = timeStateSlice.actions;
export default timeStateSlice.reducer;
