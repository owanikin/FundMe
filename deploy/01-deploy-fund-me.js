//  async function deployFunc() {
//     console.log("Hi");
//  }

const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

//  module.exports.default = deployFunc

// const { getNamedAccounts, deployments } = hre
module.exports = async({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }


    // if the contract doesn't exist, we deploy a minimal version for our local testing

    // Well what happens when we want to change chains?
    // When going for localhost or hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put price feed address
        log: true,
    })
    
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        // Verify
        await verify(fundMe.address, args)
    }
    log("---------------------------")
}

module.exports.tags = ["all", "fundme"]