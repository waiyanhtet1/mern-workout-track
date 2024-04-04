import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WorkoutContextProvider } from "./context/workoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
