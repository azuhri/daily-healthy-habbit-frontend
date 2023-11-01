import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import modalSlice from "./features/modal/modalSlice";
import habitSidebarSlice from "./features/habitSidebar/habitSidebarSlice";
import timeStateSlice from "./features/time/timeStateSlice";
import habitsSlice from "./features/habits/habitsSlice";
import guestSlice from "./features/guest/guestSlice";
import { useDispatch } from "react-redux";

const reducer = combineReducers({
  modal: modalSlice,
  sidebar: habitSidebarSlice,
  time: timeStateSlice,
  habits: habitsSlice,
  guest: guestSlice,
});

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const wrapper = createWrapper<AppStore>(makeStore);
