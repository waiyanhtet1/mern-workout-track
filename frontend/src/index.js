import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WorkoutContextProvider } from "./context/workoutContext";
import { AuthContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkoutContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </WorkoutContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
