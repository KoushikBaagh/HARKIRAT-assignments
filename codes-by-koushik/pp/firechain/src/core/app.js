import React from "react";
// Removed unused styles import
import { CssBaseline } from "@mui/material"; // Keep CssBaseline if applying globally here - Decided against global here, handled in HomeView

class App extends React.Component {
  render() {
    console.log("app loaded");
    return (
      <React.Fragment>
        {/* CssBaseline removed, handled within HomeView's ThemeProvider */}
        {/* Removed the outer div */}
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default App;
