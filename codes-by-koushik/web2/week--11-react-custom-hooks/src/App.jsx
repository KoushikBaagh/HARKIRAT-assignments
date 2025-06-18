// import { useState } from "react";
// import "./hooks/useFetch";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

function App() {
  const postTitle = useFetch();

  return (
    <div>
      <h1>Todo Title:</h1>
      <p>{postTitle || "Loading..."}</p>
    </div>
  );
}

export default App;
