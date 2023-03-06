const { resolve } = require("path");
const { config: dotenvConfig } = require("dotenv");

const dotenvConfigPath = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(process.cwd(), dotenvConfigPath) });

const INFURA_KEY = process.env.INFURA_API_KEY;
if (typeof INFURA_KEY === "undefined") {
  throw new Error(`INFURA_API_KEY must be a defined environment variable`);
}

const infuraUrl = (network) => `https://${network}.infura.io/v3/${INFURA_KEY}`;

/**
 * All supported network names
 * To use a network in your command use the value of each key
 *
 * e.g.
 *
 * $ yarn deploy:network mainnet
 *
 * $ npx hardhat run scripts/deploy.ts --network polygon-mainnet
 */
const networks = {
  // ETHEREUM
  mainnet: {
    chainId: 1,
    url: infuraUrl("mainnet"),
  },
  goerli: {
    chainId: 5,
    url: infuraUrl("goerli"),
  },
  sepolia: {
    chainId: 11_155_111,
    url: infuraUrl("sepolia"),
  },

  // BINANCE SMART CHAIN
  bsc: {
    chainId: 56,
    url: "https://bsc-dataseed1.defibit.io/",
  },
  "bsc-testnet": {
    chainId: 97,
    url: "https://data-seed-prebsc-2-s1.binance.org:8545/",
  },

  // MATIC/POLYGON
  "polygon-mainnet": {
    chainId: 137,
    url: infuraUrl("polygon-mainnet"),
  },
  "polygon-mumbai": {
    chainId: 80001,
    url: infuraUrl("polygon-mumbai"),
  },

  // OPTIMISM
  "optimism-mainnet": {
    chainId: 10,
    url: infuraUrl("optimism-mainnet"),
  },
  "optimism-goerli": {
    chainId: 420,
    url: infuraUrl("optimism-goerli"),
  },

  // ARBITRUM
  "arbitrum-mainnet": {
    chainId: 42_161,
    url: infuraUrl("arbitrum-mainnet"),
  },
  "arbitrum-goerli": {
    chainId: 421_611,
    url: infuraUrl("arbitrum-goerli"),
  },
};

module.exports = {
  networks,
};
