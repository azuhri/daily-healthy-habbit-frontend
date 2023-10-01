import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import "moment/locale/id";

interface TimeState {
  date?: moment.Moment;
}

const initialState: TimeState = {
  date: moment().locale("id"),
};

const timeStateSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    changeDate: (state, action) => {
      const format = moment(action.payload.date).locale("id");
      state.date = format;
    },
  },
});

export const { changeDate } = timeStateSlice.actions;
export default timeStateSlice.reducer;
