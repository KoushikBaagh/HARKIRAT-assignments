import { useState } from "react";
import "./App.css";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  const handleGenerateMnemonic = () => {
    setMnemonic(generateMnemonic());
  };

  return (
    <div className="app-container">
      <h1 className="title">Create Seed Phrase</h1>
      {!mnemonic && (
        <button onClick={handleGenerateMnemonic}>Generate Mnemonic</button>
      )}
      {mnemonic && (
        <div className="mnemonic-container">
          <p className="mnemonic">{mnemonic}</p>
          <SolanaWallet mnemonic={mnemonic} />
          <EthWallet mnemonic={mnemonic} />
          <button className="send-button">Send</button>
        </div>
      )}
    </div>
  );
}

export default App;
