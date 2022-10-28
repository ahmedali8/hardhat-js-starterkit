require("@nomicfoundation/hardhat-toolbox");
require("@primitivefi/hardhat-dodoc");
const { config: dotenvConfig } = require("dotenv");
require("hardhat-contract-sizer");
const { resolve } = require("path");

const { API_KEYS } = require("./config/api-keys");
const { networks } = require("./config/networks");
require("./tasks");

dotenvConfig({ path: resolve(__dirname, "./.env") });

const ACCOUNT_TYPE = process.env.ACCOUNT_TYPE;
const mnemonic = process.env.MNEMONIC;
if (ACCOUNT_TYPE === "MNEMONIC" && !mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}
if (
  ACCOUNT_TYPE === "PRIVATE_KEYS" &&
  typeof process.env.PRIVATE_KEY_1 === "undefined"
) {
  throw new Error("Please set at least one PRIVATE_KEY_1 in a .env file");
}

const getAccounts = () => {
  if (ACCOUNT_TYPE === "PRIVATE_KEYS") {
    // can add as many private keys as you want
    return [
      `0x${process.env.PRIVATE_KEY_1}`,
      // `0x${process.env.PRIVATE_KEY_2}`,
      // `0x${process.env.PRIVATE_KEY_3}`,
      // `0x${process.env.PRIVATE_KEY_4}`,
      // `0x${process.env.PRIVATE_KEY_5}`,
    ];
  } else {
    return {
      mnemonic,
      count: 10,
      path: "m/44'/60'/0'/0",
    };
  }
};

function getChainConfig(network) {
  return {
    accounts: getAccounts(),
    chainId: networks[network].chainId,
    url: networks[network].url,
  };
}

module.exports = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: process.env.CONTRACT_SIZER ? true : false,
    disambiguatePaths: false,
  },
  defaultNetwork: "hardhat",
  dodoc: {
    runOnCompile: false,
    debugMode: false,
    keepFileStructure: true,
    freshOutput: true,
    outputDir: "./docs",
    include: ["contracts"],
  },
  etherscan: {
    apiKey: API_KEYS,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: "USD",
    // if commented out then it fetches from ethGasStationAPI
    // gasPrice: process.env.GAS_PRICE,
    coinmarketcap: process.env.COIN_MARKET_CAP_API_KEY || null,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    // LOCAL
    hardhat: { chainId: 31337 },
    "truffle-dashboard": {
      url: "http://localhost:24012/rpc",
    },
    ganache: { chainId: 1337, url: "http://127.0.0.1:7545" },

    // ETHEREUM
    mainnet: getChainConfig("mainnet"),
    goerli: getChainConfig("goerli"),
    sepolia: getChainConfig("sepolia"),

    // BINANCE SMART CHAIN
    bsc: getChainConfig("bsc"),
    "bsc-testnet": getChainConfig("bsc-testnet"),

    // MATIC/POLYGON
    "polygon-mainnet": getChainConfig("polygon-mainnet"),
    "polygon-mumbai": getChainConfig("polygon-mumbai"),

    // OPTIMISM
    "optimism-mainnet": getChainConfig("optimism-mainnet"),
    "optimism-goerli": getChainConfig("optimism-goerli"),

    // ARBITRUM
    "arbitrum-mainnet": getChainConfig("arbitrum-mainnet"),
    "arbitrum-goerli": getChainConfig("arbitrum-goerli"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          metadata: {
            // Not including the metadata hash
            // https://github.com/paulrberg/solidity-template/issues/31
            bytecodeHash: "none",
          },
          // Disable the optimizer when debugging
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};
