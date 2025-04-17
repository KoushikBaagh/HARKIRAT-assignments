import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);

  const fetchBalance = async (publicKey) => {
    const connection = new Connection(clusterApiUrl("devnet"));
    const balance = await connection.getBalance(publicKey);
    setWallets((prevWallets) =>
      prevWallets.map((wallet) =>
        wallet.publicKey === publicKey ? { ...wallet, balance } : wallet
      )
    );
  };

  return (
    <div>
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setWallets([
            ...wallets,
            { publicKey: keypair.publicKey, balance: null },
          ]);
        }}
      >
        Add SOL wallet
      </button>
      {wallets.map((wallet, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <span>{wallet.publicKey.toBase58()}</span>
          <button
            onClick={() => fetchBalance(wallet.publicKey)}
            style={{ marginLeft: "10px" }}
          >
            Fetch Balance
          </button>
          {wallet.balance !== null && (
            <span style={{ marginLeft: "10px" }}>
              Balance: {wallet.balance} lamports
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
