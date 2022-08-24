//  async function deployFunc() {
//     console.log("Hi");
//  }

const { network } = require("hardhat")

//  module.exports.default = deployFunc

// const { getNamedAccounts, deployments } = hre
module.exports = async({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Well what happens when we want to change chains?
    // When going for localhost or hardhat network we want to use a mock
}