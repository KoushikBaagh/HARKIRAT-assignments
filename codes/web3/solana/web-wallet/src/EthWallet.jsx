import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: "-aBIZ8lHcFF-FUyydxEzzGLVwT4BedSi",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [balances, setBalances] = useState({});

  const fetchBalance = async (address) => {
    const balance = await alchemy.core.getBalance(address);
    setBalances((prevBalances) => ({
      ...prevBalances,
      [address]: balance.toString(),
    }));
  };

  return (
    <div>
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet.address]);
        }}
      >
        Add ETH wallet
      </button>

      {addresses.map((address) => (
        <div key={address} style={{ display: "flex", alignItems: "center" }}>
          <div>Eth - {address}</div>
          <button
            onClick={() => fetchBalance(address)}
            style={{ marginLeft: "10px" }}
          >
            Fetch Balance
          </button>
          {balances[address] && (
            <div style={{ marginLeft: "10px" }}>
              Balance: {balances[address]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
