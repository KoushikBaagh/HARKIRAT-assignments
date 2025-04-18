async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy("Hello Hardhat!");
  console.log("Deploying contracts with the account:", helloWorld.deployTransaction.from);

  await helloWorld.deployed();

  console.log("HelloWorld deployed to:", helloWorld.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/********************************Another Method************************************* */
//   async function main() {
//     const [deployer] = await ethers.getSigners();
//     console.log("Deploying contracts with the account:", deployer.address);

//     const HelloWorld = await ethers.getContractFactory("HelloWorld");
//     const helloWorld = await HelloWorld.deploy("Hello, Blockchain!");

//     console.log("HelloWorld deployed to:", helloWorld.address);
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });