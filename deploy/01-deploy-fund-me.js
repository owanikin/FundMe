//  async function deployFunc() {
//     console.log("Hi");
//  }

const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")

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
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // put price feed address
        log: true,
    })
    log("---------------------------")
}

module.exports.tags = ["all", "fundme"]