const {
    DefenderRelayProvider,
    DefenderRelaySigner,
} = require("defender-relay-client/lib/ethers")
const { ethers } = require("hardhat")
const { writeFileSync } = require("fs")

async function main() {
    const registrationDuration = Math.floor(Date.now() / 1000) + 300
    const votingStartTime = registrationDuration + 100
    const votingEndTime = Math.floor(votingStartTime + 600)
    const id = [1, 2, 3]
    const names = ["Peter Gregory Obi", "Bola Ahmed Tinubu", "Atiku Abubakar"]
    const vice = ["Shettima", "igboman", "Prof"]
    const voteCount = [0, 0, 0]
    const images = [
        "https://bafkreie2rpjvsqw37yxu2trwq2sbdyumcksbitmbjhfnsghdf32f3cic5q.ipfs.nftstorage.link/",
        "https://bafkreia3z6qwfnsetmsnbb4ighggwio3fyzmpeozgykm6yahaf2mwxk7se.ipfs.nftstorage.link/",
        "https://bafkreib22x2uicqktdt2pzdqx2teahfs6oz5w37ncel7kazzcpk7jkdvda.ipfs.nftstorage.link/",
    ]
    const parties = ["Labour", "APC", "PDP"]
    const position = ["President", "President", "President"]

    require("dotenv").config()
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

    const VoteChain = await ethers.getContractFactory("VoteChain")
    const voteChain = await VoteChain.connect(relaySigner)
        .deploy(registrationDuration, forwarder.address)
        .then((f) => f.deployed())

    writeFileSync(
        "deploy.json",
        JSON.stringify(
            {
                MinimalForwarder: forwarder.address,
                VoteChain: voteChain.address,
            },
            null,
            2
        )
    )

    console.log(
        `MinimalForwarder: ${forwarder.address}\n VoteChain: ${voteChain.address}`
    )
}

if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error)
            process.exit(1)
        })
}
