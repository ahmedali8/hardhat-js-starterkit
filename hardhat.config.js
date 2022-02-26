require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");
require("hardhat-docgen");

require("./tasks");

const { resolve } = require("path");
const { config: dotenvConfig } = require("dotenv");

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

const INFURA_KEY = process.env.INFURA_PROJECT_ID;
if (typeof INFURA_KEY === "undefined") {
  throw new Error(`INFURA_PROJECT_ID must be a defined environment variable`);
}

const infuraUrl = (network) => `https://${network}.infura.io/v3/${INFURA_KEY}`;

const networks = {
  hardhat: { chainId: 31337 },
  ganache: { chainId: 1337, url: "http://127.0.0.1:7545" },

  // ETHEREUM
  mainnet: {
    chainId: 1,
    url: infuraUrl("mainnet"),
    apiKey: process.env.ETHERSCAN_API_KEY || null,
  },
  kovan: {
    chainId: 42,
    url: infuraUrl("kovan"),
    apiKey: process.env.ETHERSCAN_API_KEY || null,
  },
  goerli: {
    chainId: 5,
    url: infuraUrl("goerli"),
    apiKey: process.env.ETHERSCAN_API_KEY || null,
  },
  rinkeby: {
    chainId: 4,
    url: infuraUrl("rinkeby"),
    apiKey: process.env.ETHERSCAN_API_KEY || null,
  },
  ropsten: {
    chainId: 3,
    url: infuraUrl("ropsten"),
    apiKey: process.env.ETHERSCAN_API_KEY || null,
  },

  // BINANCE SMART CHAIN
  bsc: {
    chainId: 56,
    url: process.env.BSC_MAINNET_RPC_URL,
    apiKey: process.env.BSCSCAN_API_KEY || null,
  },
  bscTestnet: {
    chainId: 97,
    url: process.env.BSC_TESTNET_RPC_URL,
    apiKey: process.env.BSCSCAN_API_KEY || null,
  },

  // MATIC/POLYGON
  polygon: {
    chainId: 137,
    url: infuraUrl("polygon-mainnet"),
    apiKey: process.env.POLYGONSCAN_API_KEY || null,
  },
  polygonMumbai: {
    chainId: 80001,
    url: infuraUrl("polygon-mumbai"),
    apiKey: process.env.POLYGONSCAN_API_KEY || null,
  },

  // OPTIMISM
  optimisticEthereum: {
    chainId: 10,
    url: infuraUrl("optimism-mainnet"),
    apiKey: process.env.OPTIMISTIC_ETHERSCAN_API_KEY || null,
  },
  optimisticKovan: {
    chainId: 69,
    url: infuraUrl("optimism-kovan"),
    apiKey: process.env.OPTIMISTIC_ETHERSCAN_API_KEY || null,
  },

  // ARBITRUM
  arbitrumOne: {
    chainId: 42161,
    url: infuraUrl("arbitrum-mainnet"),
    apiKey: process.env.ARBISCAN_API_KEY || null,
  },
  arbitrumTestnet: {
    chainId: 421611,
    url: infuraUrl("arbitrum-rinkeby"),
    apiKey: process.env.ARBISCAN_API_KEY || null,
  },
};

// can add as many private keys as you want
const accounts =
  ACCOUNT_TYPE === "MNEMONIC"
    ? {
        count: 10,
        mnemonic,
        path: "m/44'/60'/0'/0",
      }
    : [
        `0x${process.env.PRIVATE_KEY_1}`,
        // `0x${process.env.PRIVATE_KEY_2}`,
        // `0x${process.env.PRIVATE_KEY_3}`,
        // `0x${process.env.PRIVATE_KEY_4}`,
        // `0x${process.env.PRIVATE_KEY_5}`,
      ];

function getChainConfig(network) {
  return {
    accounts,
    chainId: networks[network].chainId,
    url: networks[network].url,
    apiKey: networks[network].apiKey,
  };
}

module.exports = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: process.env.CONTRACT_SIZER ? true : false,
    disambiguatePaths: false,
  },
  defaultNetwork: "hardhat",
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: process.env.DOC_GEN ? true : false,
  },
  etherscan: {
    apiKey: {
      // ETHEREUM
      mainnet: getChainConfig("mainnet").apiKey,
      ropsten: getChainConfig("ropsten").apiKey,
      rinkeby: getChainConfig("rinkeby").apiKey,
      goerli: getChainConfig("goerli").apiKey,

      // BINANCE SMART CHAIN
      bsc: getChainConfig("bsc").apiKey,
      bscTestnet: getChainConfig("bscTestnet").apiKey,

      // MATIC/POLYGON
      polygon: getChainConfig("polygon").apiKey,
      polygonMumbai: getChainConfig("polygonMumbai").apiKey,
    },
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
    hardhat: {
      chainId: networks["hardhat"].chainId,
    },
    ganache: {
      chainId: networks["ganache"].chainId,
      url: networks["ganache"].url,
    },

    // ETHEREUM
    mainnet: getChainConfig("mainnet"),
    ropsten: getChainConfig("ropsten"),
    rinkeby: getChainConfig("rinkeby"),
    goerli: getChainConfig("goerli"),

    // BINANCE SMART CHAIN
    bsc: getChainConfig("bsc"),
    bscTestnet: getChainConfig("bscTestnet"),

    // MATIC/POLYGON
    polygon: getChainConfig("polygon"),
    polygonMumbai: getChainConfig("polygonMumbai"),
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
        version: "0.8.12",
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
