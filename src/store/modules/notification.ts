import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    open: false,
    message: "",
  },
  reducers: {
    notify(state, { payload }) {
      if (payload) {
        state = payload;
        // state.open = payload.open;
        // state.message = payload.message;
      }
      console.log(payload);
    },
  },
});
export const { notify } = notificationSlice.actions;
export default notificationSlice.reducer;
