require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
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
