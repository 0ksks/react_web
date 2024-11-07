import { createSlice } from "@reduxjs/toolkit";
import { SnackbarProps, AlertProps } from "@mui/material";

interface NotificationState extends SnackbarProps {
  alertProps?: AlertProps;
  message?: string;
}

const initialState: NotificationState = {
  open: false,
  message: "",
  alertProps: { severity: "info" },
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
