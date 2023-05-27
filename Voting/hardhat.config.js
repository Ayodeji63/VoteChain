require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",

    namedAccounts: {
        deployer: {
            default: 0,
        },
        voter1: {
            default: 1,
        },
    },
}
