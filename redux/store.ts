import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import modalSlice from "./features/modal/modalSlice";
import habitSidebarSlice from "./features/habitSidebar/habitSidebarSlice";
import timeStateSlice from "./features/time/timeStateSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      modal: modalSlice,
      sidebar: habitSidebarSlice,
      time: timeStateSlice,
    },
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

export const wrapper = createWrapper<AppStore>(makeStore);
