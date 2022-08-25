require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("dotenv").config()

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
// console.log(`This is rinkeby url: ${RINKEBY_RPC_URL}`);
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY
// console.log(`This is private key: ${RINKEBY_PRIVATE_KEY}`);
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [RINKEBY_PRIVATE_KEY],
      chainId: 4,
      blockConfirmations: 6,
    }
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-reporter.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC"
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    }
  },
  // solidity: "0.8.9",
  solidity: {
    compilers: [
      {version: "0.8.9"},
      {version: "0.6.6"}
    ]
  }
};
