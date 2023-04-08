const hre = require("hardhat");

async function main() {
  const Chatapp = await hre.ethers.getContractFactory("Chatapp");
  const chatapp = await Chatapp.deploy();

  await chatapp.deployed();

  console.log(`Contract address: ${chatapp.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
