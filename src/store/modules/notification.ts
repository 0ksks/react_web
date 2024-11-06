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
        state.open = payload.open; // TODO test
        state.message = payload.message; // test
        state = payload;
      }
      console.log("log payload after valued", payload);
    },
  },
});
export const { notify } = notificationSlice.actions;
export default notificationSlice.reducer;
