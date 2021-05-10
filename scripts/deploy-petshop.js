const fs = require("fs");

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const Petshop = await ethers.getContractFactory("Petshop");
  petshop = await Petshop.deploy("Petshop", "PET", "https://ipfs.io/ipfs/");
  createJson("petshop", petshop);
  // console.log(carbonToken);
  console.log(`petshop address: ${petshop.address}`);

  function createJson(name, contract) {
    let addressObj = {};
    addressObj[chainId] = contract.address;
    console.log(addressObj);

    fs.writeFileSync(
      `abis/${name}.json`,
      JSON.stringify({
        address: addressObj,
        abi: JSON.parse(contract.interface.format("json")),
      })
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
