async function main() {
  const KYCRegistry = await ethers.getContractFactory("KYCRegistry");
  const kycRegistry = await KYCRegistry.deploy();

  await kycRegistry.deployed();

  console.log("KYCRegistry deployed to:", kycRegistry.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
