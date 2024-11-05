import React, { Suspense } from "react";
import { Link, useRoutes } from "react-router-dom";
import routes from "@/router";

function App() {
  return (
    <div className="App">
      <div className="nav">
        <Link to={"/home"}>home</Link>
        <Link to={"/login"}>login</Link>
      </div>
      <Suspense fallback={""}>
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  );
}

export default App;
