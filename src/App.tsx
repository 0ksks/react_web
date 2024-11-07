import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "@/router";
import { useAppSelector } from "./store";
import { shallowEqual } from "react-redux";
import { Snackbar } from "@mui/material";
function App() {
  const { notification } = useAppSelector((state) => state, shallowEqual);
  return (
    <div className="App">
      <Snackbar open={notification.open}>{notification.children}</Snackbar>
      <Suspense fallback={""}>
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  );
}

export default App;
