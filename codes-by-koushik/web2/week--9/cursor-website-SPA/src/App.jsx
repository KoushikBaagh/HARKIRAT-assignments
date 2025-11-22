import { useState } from "react";
import TopNav from "./components/TopNav";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <>
      <TopNav />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
