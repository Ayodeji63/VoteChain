const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect, assert } = require("chai")
const { network, ethers } = require("hardhat")

describe("SBT", () => {
    let owner, addr1, addr2, addr3, sbt
    const name = "APC VOTERS"
    const symbol = "APV"
    const uri =
        "https://bafkreihfbb3qqng3xnaecjlar34hgajwcj3rkrtdpi4rhvghqfl4kftzgy.ipfs.nftstorage.link/"
    const registrationDuration = Math.floor(Date.now() / 1000) + 300
    const votingStartTime = registrationDuration + 300
    const votingEndTime = Math.floor(votingStartTime + 3600)
    const id = [1, 2, 3]
    const names = ["Buhari", "Atiku", "Peter"]
    const vice = ["Shettima", "igboman", "Prof"]
    const voteCount = [0, 0, 0]
    const images = ["", "", ""]
    const parties = ["APC", "PDP", "Labour"]
    const position = ["President", "President", "President"]
    beforeEach(async () => {
        ;[owner, addr1, addr2, addr3] = await ethers.getSigners()

        const forwarder = "0xb539068872230f20456CF38EC52EF2f91AF4AE49"
        VoteChain = await ethers.getContractFactory("VoteChain")
        voteChain = await VoteChain.deploy(
            registrationDuration,
            forwarder,
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
        const SBT = await ethers.getContractFactory("ASBT")
        sbt = await SBT.deploy(voteChain.address)
    })

    describe("Deployment", () => {
        it("Should be name", async () => {
            const tx = await sbt.name()
            console.log(tx)
            assert.equal(tx, name)
        })
        it("Should be symbol", async () => {
            assert.equal(await sbt.symbol(), symbol)
        })
    })

    describe("minting", () => {
        it("Should mint", async () => {
            try {
                let registerVoter = await voteChain
                    .connect(addr1)
                    .registerVoter(1, "Sammy", "Wise")
                await network.provider.send("evm_increaseTime", [1000])
                let tx = await sbt.mintSBT(1, addr1.address)
                expect(await tx)
                    .to.emit(sbt, "TokenMinted")
                    .withArgs(addr1.address, 1)
                console.log(tx.value)
            } catch (e) {
                console.log(e)
            }
        })
        it("should set base uri", async () => {
            let tx = await sbt._setBaseURI(uri)
            tx = await sbt._uri()
            console.log(tx)
            assert.equal(tx, uri)
        })
    })
})
