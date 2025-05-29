// @ts-nocheck
import { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();
  function sendMessage() {
    if (!socket) {
      alert("WebSocket not connected!");
      return;
    }
    const inputText = inputRef.current.value;
    console.log("Sending:", inputText);
    socket.send(inputText);
    inputRef.current.value = ""; // Clear input after sending
  }
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws); // Important Part... Store the WebSocket in state
    ws.onmessage = (event) => {
      console.log("Received:", event.data);
      alert(event.data);
    };
  }, []);
  return (
    <div>
      <span>
        <input ref={inputRef} type="text" placeholder="message..." />
      </span>

      <span>
        {" "}
        <button onClick={sendMessage}>Enter</button>
      </span>
    </div>
  );
}

export default App;
