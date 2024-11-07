import { createSlice } from "@reduxjs/toolkit";
import { SnackbarProps, AlertProps } from "@mui/material";

export interface NotificationState extends SnackbarProps {
  alertprops?: AlertProps;
  message?: string;
}

const initialState: NotificationState = {
  open: false,
  message: "",
  alertprops: { severity: "info" },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeSnackbarPropsAction(state, { payload }) {
      return { ...state, ...payload, open: true };
    },
    closeNotification(state) {
      state.open = false;
    },
  },
});

export const { changeSnackbarPropsAction, closeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
