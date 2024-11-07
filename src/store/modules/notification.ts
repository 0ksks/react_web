import { createSlice } from "@reduxjs/toolkit";
import { SnackbarProps } from "@mui/material";
const initialState: SnackbarProps = {};
const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    notify(state, { payload }) {
      if (payload) {
        return payload;
      }
    },
  },
});
export const { notify } = notificationSlice.actions;
export default notificationSlice.reducer;
