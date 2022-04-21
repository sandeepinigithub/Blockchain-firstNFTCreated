const hre = require('hardhat');
async function main() {
  const tokenURI = "https://gateway.pinata.cloud/ipfs/QmRMZumpXcP1L5XKiBWxnYKALgraVj432jsdrZTDx2s5pb"; 
// this is URL that you will get from Pinata
const nftContractFactory = await ethers.getContractFactory("NFT");
const nftContractInstance = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    //insert contract address that gets deployed
    nftContractFactory.interface,
  )
const signer = await ethers.provider.getSigner();
const signerAddress = await signer.getAddress()
const txn = await nftContractInstance.connect(signer).mint(signerAddress, tokenURI)
  
txn.wait();
  console.log(`Your transaction has been successfully broadcasted! The transaction hash is ${txn.hash}`);
  if (hre.network.config.url != '<http://127.0.0.1:8545>') {
    console.log(`\nPlease follow this link https://testnets.opensea.io/${signerAddress}`);
  };
};
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});