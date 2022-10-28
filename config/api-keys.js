const { resolve } = require("path");
const { config: dotenvConfig } = require("dotenv");

dotenvConfig({ path: resolve(__dirname, "../.env") });

const API_KEYS = {
  // ETHEREUM
  mainnet: process.env.ETHERSCAN_API_KEY || "",
  goerli: process.env.ETHERSCAN_API_KEY || "",
  sepolia: process.env.ETHERSCAN_API_KEY || "",

  // BINANCE SMART CHAIN
  bsc: process.env.BSCSCAN_API_KEY || "",
  bscTestnet: process.env.BSCSCAN_API_KEY || "",

  // MATIC/POLYGON
  polygon: process.env.POLYGONSCAN_API_KEY || "",
  polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",

  // OPTIMISM
  optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
  optimisticGoerli: process.env.OPTIMISM_API_KEY || "",

  // ARBITRUM
  arbitrumOne: process.env.ARBISCAN_API_KEY || "",
  arbitrumTestnet: process.env.ARBISCAN_API_KEY || "",
};

module.exports = {
  API_KEYS,
};
