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
    const registrationDuration = Math.floor(Date.now() / 1000) + 3000
    const VoteChain = await hre.ethers.getContractFactory("VoteChain")
    const voteChain = await VoteChain.deploy(registrationDuration)

    await voteChain.deployed()

    console.log(`VoteChain Deployed at`, voteChain.address)
    console.log(`Waiting for block txes`)
    await voteChain.deployTransaction.wait(3)
    await verify(voteChain.address, [registrationDuration])
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
