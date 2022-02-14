// hardhat waffle
require("@nomiclabs/hardhat-waffle");
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

// require tasks
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
const BSC_MAINNET_KEY = process.env.BSC_MAINNET_RPC_URL;
const BSC_TESTNET_KEY = process.env.BSC_TESTNET_RPC_URL;
if (typeof INFURA_KEY === "undefined") {
  throw new Error(`INFURA_PROJECT_ID must be a defined environment variable`);
}

const infuraUrl = (network) => `https://${network}.infura.io/v3/${INFURA_KEY}`;

const networks = {
  arbone: {
    chainId: 42161,
    url: infuraUrl("arbitrum-mainnet"),
  },
  arbrinkeby: {
    chainId: 421611,
    url: infuraUrl("arbitrum-rinkeby"),
  },
  bnb: { chainId: 56, url: BSC_MAINNET_KEY },
  bnbt: { chainId: 97, url: BSC_TESTNET_KEY },
  ganache: { chainId: 1337, url: "http://127.0.0.1:7545" },
  goerli: { chainId: 5, url: infuraUrl("goerli") },
  hardhat: { chainId: 31337 },
  kovan: { chainId: 42, url: infuraUrl("kovan") },
  mainnet: { chainId: 1, url: infuraUrl("mainnet") },
  matic: {
    chainId: 137,
    url: infuraUrl("polygon-mainnet"),
  },
  maticmum: {
    chainId: 80001,
    url: infuraUrl("polygon-mumbai"),
  },
  optimism: {
    chainId: 10,
    url: infuraUrl("optimism-mainnet"),
  },
  optimismkovan: {
    chainId: 69,
    url: infuraUrl("optimism-kovan"),
  },
  rinkeby: { chainId: 4, url: infuraUrl("rinkeby") },
  ropsten: { chainId: 3, url: infuraUrl("ropsten") },
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
  };
}

module.exports = {
  abiExporter: {
    path: "./abi_exporter",
    clear: true,
    flat: true,
    spacing: 2,
  },
  contractSizer: () =>
    process.env.CONTRACT_SIZER && {
      alphaSort: true,
      runOnCompile: true,
      disambiguatePaths: false,
    },
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || null,
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

    /* ETHEREUM */
    mainnet: getChainConfig("mainnet"),
    ropsten: getChainConfig("ropsten"),
    rinkeby: getChainConfig("rinkeby"),
    goerli: getChainConfig("goerli"),

    /* BINANCE SMART CHAIN */
    bnb: getChainConfig("bnb"),
    bnbt: getChainConfig("bnbt"),

    /* MATIC L2 */
    matic: getChainConfig("matic"),
    maticmum: getChainConfig("maticmum"),

    /* ARBITRUM L2 */
    arb: getChainConfig("arbone"),
    arbrinkeby: getChainConfig("arbrinkeby"),

    /* OPTIMISM L2 */
    optimism: getChainConfig("optimism"),
    optimismkovan: getChainConfig("optimismkovan"),
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
        version: "0.8.11",
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
