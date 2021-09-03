const {
  etherBalanceString: etherBalanceStr,
  deployContract,
  toWei,
  log,
  logString,
  logGas,
  verifyContract,
} = require("../utils/utils.js");

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  const [owner] = await ethers.getSigners();

  console.log(`Connected to name: ${name} & chainId: ${chainId}`);
  console.log(`Deploying contracts with the account: ${owner.address}`);
  console.log(`Owner balance: ${await etherBalanceStr(owner.address)}`);

  const args = [
    "testing new created token",
    "TCT",
    toWei("6000000"),
    owner.address,
  ];
  const testingContract = await deployContract(owner, "TestingContract", args);
  const tx = testingContract.deployTransaction;
  await logGas(tx);

  if (chainId != 31337 && chainId != 1337) {
    await verifyContract(testingContract.address, args, tx);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
