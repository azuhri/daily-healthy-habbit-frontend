import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  type: string;
}

const initialState: ModalState = {
  isOpen: false,
  type: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
