/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
// for web3 and truffle compatibility
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-truffle5");
// verify contract on etherscan
require("@nomiclabs/hardhat-etherscan");
// for exporting abi in separate file
require("hardhat-abi-exporter");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.4",
  networks: {
    // hardhat: {
    //   chainId: 1337,
    // },
    localhost: {
      url: "http://127.0.0.1:7545",
    },

    /* ETHEREUM TESTNETS */
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 3,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 4,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 5,
    },

    /* BINANCE SMART CHAIN */
    bscMainnet: {
      url: process.env.BSC_MAINNET_RPC_URL,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 56,
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_RPC_URL,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 97,
    },

    /* MATIC L2 */
    maticMainnet: {
      url: process.env.MATIC_MAINNET_RPC_URL,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 137,
    },
    maticTestnet: {
      url: process.env.MATIC_MUMBAI_TESTNET_RPC_URL,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  abiExporter: {
    path: "./abi-exporter",
    clear: true,
    flat: true,
    // only: [':ERC20$'],
    spacing: 2,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
