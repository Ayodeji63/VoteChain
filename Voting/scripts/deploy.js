const {
    DefenderRelayProvider,
    DefenderRelaySigner,
} = require("defender-relay-client/lib/ethers")
const { run, ethers, network } = require("hardhat")
const { writeFileSync } = require("fs")
require("dotenv").config()
const { RelayClient } = require("defender-relay-client")

async function verify(contractAddress, contractName, args) {
    console.log("Verifying Contract....")
    try {
        await run("verify:verify", {
            contract: `contracts/${contractName}.sol:${contractName}`,
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

async function waitForConfirmations(txHash, confirmationCount) {
    const provider = ethers.provider
    const startBlockNumber = await provider.getBlockNumber()

    let currentConfirmationCount = 0

    while (currentConfirmationCount < confirmationCount) {
        const currentBlockNumber = await provider.getBlockNumber()

        if (currentBlockNumber > startBlockNumber) {
            const transaction = await provider.getTransaction(txHash)

            if (
                transaction &&
                transaction.confirmations > currentConfirmationCount
            ) {
                currentConfirmationCount = transaction.confirmations
                console.log(
                    `Confirmation count: ${currentConfirmationCount}/${confirmationCount}`
                )
            }
        }

        await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second before checking again
    }
}
async function main() {
    console.log(network.config.chainId)
    const registrationDuration = Math.floor(Date.now() / 1000) + 2000
    const votingStartTime = registrationDuration + 100
    const votingEndTime = Math.floor(votingStartTime + 1800)
    const id = [1, 2, 3]
    const names = ["Peter Gregory Obi", "Bola Ahmed Tinubu", "Atiku Abubakar"]
    const vice = ["Shettima", "igboman", "Prof"]
    const voteCount = [0, 0, 0]
    const images = [
        "https://bafkreie4reqha4h67zy5atqatrf4625rrhehe6dyqmfvmn7tyrmfggz7ky.ipfs.nftstorage.link/",
        "https://bafkreiamc64b3i3jg3sk5n3xszrvvjyzkd55gsosgbufj2o2z5fxr25yma.ipfs.nftstorage.link/",
        "https://bafkreichftcbyh5etvzvmhbfgrmbczeqtk7we54nnvgcc4hqpor5x3ljv4.ipfs.nftstorage.link/",
    ]
    const parties = ["Labour", "APC", "PDP"]
    const position = ["President", "President", "President"]

    const credentials = {
        apiKey: process.env.RELAYER_API_KEY,
        apiSecret: process.env.RELAYER_API_SECRET,
    }
    const provider = new DefenderRelayProvider(credentials)
    const relaySigner = new DefenderRelaySigner(credentials, provider, {
        speed: "fast",
    })

    const Forwarder = await ethers.getContractFactory("MinimalForwarder")
    const forwarder = await Forwarder.connect(relaySigner)
        .deploy()
        .then((f) => f.deployed())

    console.log(`Forwarder deployed as`, forwarder.address)

    const VoteChain = await ethers.getContractFactory("VoteChain")

    const voteChain = await VoteChain.connect(relaySigner)
        .deploy(
            registrationDuration,
            forwarder.address,
            id,
            names,
            vice,
            voteCount,
            images,
            parties,
            position,
            votingStartTime,
            votingEndTime
        )
        .then((f) => f.deployed())
    // Wait for 5 confirmations before running verification

    console.log(`VoteChain Deployed at`, voteChain.address)
    console.log("verifying...")

    const ASBT = await ethers.getContractFactory("ASBT")
    const asbt = await ASBT.connect(relaySigner)
        .deploy()
        .then((f) => f.deployed())
    await asbt.deployed()
    console.log(`ASBT deployed as`, asbt.address)

    const LSBT = await ethers.getContractFactory("LSBT")
    const lsbt = await LSBT.connect(relaySigner)
        .deploy()
        .then((f) => f.deployed())

    console.log(`LSBT deployed as`, lsbt.address)

    const PSBT = await ethers.getContractFactory("PSBT")
    const psbt = await PSBT.connect(relaySigner)
        .deploy()
        .then((f) => f.deployed())

    console.log(`PSBT deployed as`, psbt.address)

    writeFileSync(
        "deploy.json",
        JSON.stringify(
            {
                MinimalForwarder: forwarder.address,
                VoteChain: voteChain.address,
                ASBT: asbt.address,
                PSBT: psbt.address,
                LSBT: lsbt.address,
            },
            null,
            2
        )
    )

    const {
        TEAM_API_KEY: apiKey,
        TEAM_API_SECRET: apiSecret,
        RELAYER_ID: relayerId,
    } = process.env

    const relayClient = new RelayClient({ apiKey, apiSecret })

    await relayClient.update(relayerId, {
        policies: {
            whitelistReceivers: [
                voteChain.address,
                forwarder.address,
                asbt.address,
                lsbt.address,
                psbt.address,
            ],
        },
    })

    const confirmationCount = 5
    await waitForConfirmations(
        voteChain.deployTransaction.hash,
        confirmationCount
    )

    await verify(voteChain.address, "VoteChain", [
        registrationDuration,
        forwarder.address,
        id,
        names,
        vice,
        voteCount,
        images,
        parties,
        position,
        votingStartTime,
        votingEndTime,
    ])
    await verify(psbt.address, "PSBT", [])
    await verify(lsbt.address, "LSBT", [])
    await verify(asbt.address, "ASBT", [])
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
