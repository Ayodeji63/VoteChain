require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */

const P_API_KEY = process.env.P_API_KEY
const P_RPC_URL = process.env.P_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const S_RPC_URL = process.env.S_RPC_URL
const S_API_KEY = process.env.S_API_KEY
const B_RPC_URL = process.env.B_RPC_URL
const G_RPC_URL = process.env.G_RPC_URL
const F_RPC_URL = process.env.F_RPC_URL
const F_API_KEY = process.env.F_API_KEY
const OP_URL = process.env.OP_URL
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
        sepolia: {
            url: S_RPC_URL,
            accounts: [PRIVATE_KEY],
            gas: 21000000,
            gasPrice: 8000000000,
        },
        bscTestnet: {
            url: B_RPC_URL,
            accounts: [PRIVATE_KEY],
            gas: 21000000,
            gasPrice: 8000000000,
        },
        goerli: {
            url: G_RPC_URL,
            accounts: [PRIVATE_KEY],
            gas: 2100000,
            gasPrice: 8000000000,
        },
        fantomTestnet: {
            url: F_RPC_URL,
            accounts: [PRIVATE_KEY],
            gas: 21000000,
            gasPrice: 8000000000,
        },
        optimismGoerli: {
            chainId: 420,
            url: OP_URL,
            accounts: [PRIVATE_KEY],
            gas: 21000000,
            gasPrice: 8000000000,
        },
    },
    etherscan: {
        apiKey: {
            ftmTestnet: `${F_API_KEY}`,
            sepolia: `${S_API_KEY}`,
            optimisticGoerli: `${process.env.OP_API}`,
            // opera: `${F_API_KEY}`,
        },
    },
}
