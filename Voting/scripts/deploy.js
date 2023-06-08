// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
async function verify(contractAddress, args) {
    console.log("Verifying Contract....")
    try {
        await run("verify:verify", {
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
async function main() {
    const registrationDuration = Math.floor(Date.now() / 1000) + 1000
    const votingStartTime = registrationDuration + 200
    const votingEndTime = Math.floor(votingStartTime + 500)
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
    const VoteChain = await hre.ethers.getContractFactory("VoteChain")
    const forwarder = "0xb539068872230f20456CF38EC52EF2f91AF4AE49"
    const voteChain = await VoteChain.deploy(registrationDuration)

    await voteChain.deployed()

    console.log(`VoteChain Deployed at`, voteChain.address)
    console.log(`Waiting for block txes`)
    await voteChain.deployTransaction.wait(3)
    await verify(voteChain.address, [registrationDuration])

    const tx = await voteChain.initializeCandidates(
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

    await tx.wait(1)
}

// labout party logo:: https://bafkreie2rpjvsqw37yxu2trwq2sbdyumcksbitmbjhfnsghdf32f3cic5q.ipfs.nftstorage.link/

// Peter:: https://bafkreidqadt5ve2ukjgrgdjnpktoafkv5gspq7m37yelj3r2mrhgcdrivq.ipfs.nftstorage.link/

// PDP logo:: https://bafkreics5n3oleswwvy25zkga473jfp5smpizb6ki5qupla3cdpnskjwku.ipfs.nftstorage.link/

// ATIKU::
//https://bafkreib22x2uicqktdt2pzdqx2teahfs6oz5w37ncel7kazzcpk7jkdvda.ipfs.nftstorage.link/

// APC logo:: https://bafybeiaaqruff27yre5w2pxak2xmwkilraymlc3deubmhjtu6bz3du5nhq.ipfs.nftstorage.link/

// BAT:: https://bafkreia3z6qwfnsetmsnbb4ighggwio3fyzmpeozgykm6yahaf2mwxk7se.ipfs.nftstorage.link/

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
