
const hre = require("hardhat");

async function main() {


  const DEXITASWAP = await hre.ethers.getContractFactory("DexitaSwap");
  const dexitaswap = await DEXITASWAP.deploy();

  await dexitaswap.deployed();



  console.log(
   `DEXita swap contract deployed with address: ${dexitaswap.address}`
   ); 


}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
