const { ethers } = require("ethers");
require("dotenv").config();

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isVerified",
        type: "bool",
      },
    ],
    name: "KYCStatusUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "checkKYCVerification",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isKYCVerified",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registerKYC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

const signer = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
const kycContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

async function registerUserKYC(userWalletAddress) {
  try {
    const balance = await provider.getBalance(signer.address);
    if (balance.lt(ethers.utils.parseEther("0.01"))) {
      throw new Error("Insufficient funds for transaction");
    }

    const nonce = await provider.getTransactionCount(signer.address, "latest");
    const tx = await kycContract.registerKYC({ nonce });
    await tx.wait();
    console.log(`User ${userWalletAddress} registered for KYC`);
  } catch (error) {
    console.error("Error registering user for KYC:", error);
  }
}

async function checkUserKYCStatus(userWalletAddress) {
  try {
    console.log(`Checking KYC status for ${userWalletAddress}`);
    const isVerified = await kycContract.checkKYCVerification(
      userWalletAddress
    );
    console.log(`KYC status for ${userWalletAddress}: ${isVerified}`);
    return isVerified;
  } catch (error) {
    console.error("Error checking KYC status:", error);
    return false;
  }
}

async function main() {
  const userAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  await registerUserKYC(signer.address);
  await checkUserKYCStatus(userAddress);
  await checkUserKYCStatus(signer.address);
}

main();
