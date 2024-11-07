import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "@/router";
import { useAppSelector, useAppDispatch } from "./store";
import { shallowEqual } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { closeNotification } from "@/store/modules/notification";

function App() {
  const notification = useAppSelector(
    (state) => state.notification,
    shallowEqual,
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeNotification());
  };

  return (
    <div className="App">
      <Snackbar
        open={notification.open}
        onClose={handleClose}
        autoHideDuration={notification.autoHideDuration || 3000}
        {...notification}
      >
        <Alert
          onClose={handleClose}
          severity={notification.alertProps?.severity || "info"}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Suspense fallback={""}>
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  );
}

export default App;
