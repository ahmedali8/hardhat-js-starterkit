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
// sol coverage
require("solidity-coverage");
// hardhat contract sizer
require("hardhat-contract-sizer");
// hardhat gas reporter (uncomment to enable)
require("hardhat-gas-reporter");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// can add as many private keys as you want
const accounts = [
  `0x${process.env.PRIVATE_KEY_1}`,
  // `0x${process.env.PRIVATE_KEY_2}`,
  // `0x${process.env.PRIVATE_KEY_3}`,
  // `0x${process.env.PRIVATE_KEY_4}`,
  // `0x${process.env.PRIVATE_KEY_5}`,
];

const contractSizer = () =>
  process.env.CONTRACT_SIZER
    ? {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
      }
    : null;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
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
      accounts,
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 3,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts,
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 4,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts,
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 5,
    },
    /* BINANCE SMART CHAIN */
    bscmainnet: {
      url: process.env.BSC_MAINNET_RPC_URL,
      accounts,
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 56,
    },
    bsctestnet: {
      url: process.env.BSC_TESTNET_RPC_URL,
      accounts,
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 97,
    },
    /* MATIC L2 */
    maticmainnet: {
      url: process.env.MATIC_MAINNET_RPC_URL,
      accounts,
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 137,
    },
    matictestnet: {
      url: process.env.MATIC_MUMBAI_TESTNET_RPC_URL,
      accounts,
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey:
      process.env.ETHERSCAN_API_KEY || process.env.BSCSCAN_API_KEY || null,
  },
  abiExporter: {
    path: "./abi_exporter",
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
  contractSizer,
  gasReporter: {
    enabled: true, // set false to disable
    currency: "USD",
    // if commented out then it fetches from ethGasStationAPI
    // gasPrice: process.env.GAS_PRICE,
    coinmarketcap: process.env.COIN_MARKET_CAP_API_KEY || null,
  },
};
