import {
  Route,
  BrowserRouter as Router, // Changed from Router
  Routes, // Added import for v6 structure
} from "react-router-dom"; // Changed from 'react-router'

import App from "./app";
import { HomeView } from "../components/views";
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot

function run() {
  const container = document.getElementById("app");
  const root = createRoot(container); // Create a root.
  root.render(
    // Render using the root.
    <Router>
      {" "}
      {/* Use BrowserRouter */}
      <Routes>
        {" "}
        {/* Use Routes wrapper */}
        <Route
          path="/"
          element={
            <App>
              <HomeView />
            </App>
          }
        />{" "}
        {/* Structure for v6 routes */}
      </Routes>
    </Router>
  );
}

const loadedStates = ["complete", "loaded", "interactive"];
if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener("DOMContentLoaded", run, false);
}
