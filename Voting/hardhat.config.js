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
    networks: {
        polygon: {
            url: P_RPC_URL,
            accounts: [PRIVATE_KEY],
            gas: 2100000,
            gasPrice: 8000000000,
        },
        // goerli: {
        //     url: RPC_URL,
        //     accounts: [PRIVATE_KEY],
        //     gas: 2100000,
        //     gasPrice: 8000000000,
        // },
    },
}
