const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect, assert } = require("chai")
const { network } = require("hardhat")

describe("voteChain", function () {
    const registrationDuration = Math.floor(Date.now() / 1000) + 300
    // const registrationEnd = Math.floor(registrationStart + 300)
    const id = [0, 1, 2]
    const names = ["Buhari", "Atiku", "Peter"]
    const voteCount = [0, 0, 0]
    const images = ["", "", ""]
    const parties = ["APC", "PDP", "Labour"]
    const position = ["President", "President", "President"]
    let owner, addr1, addr2, addr3, addr4, VoteChain, voteChain, registerVoter

    beforeEach(async () => {
        ;[owner, addr1, addr2, addr3, addr4] = await ethers.getSigners()
        VoteChain = await ethers.getContractFactory("VoteChain")
        voteChain = await VoteChain.deploy(registrationDuration)
    })

    describe("Deployment", function () {
        it("Initializes the VoteChain constructor Correctly ", async function () {
            // const { voteChain, owner } = await loadFixture(deployVoteChain)
            const chairperson = await voteChain.i_chairperson()
            const voteDuration = await voteChain.i_registrationDuration()
            assert.equal(chairperson, owner.address)
            assert.equal(voteDuration, registrationDuration)
        })
    })

    describe("Register Voters", () => {
        it("should register a voter", async () => {
            registerVoter = await voteChain.connect(addr1).registerVoter()

            expect(await registerVoter)
                .to.emit(voteChain, "VoteChain_voterRegistered")
                .withArgs(0, addr1.address)
        })
        it("should revert when registering a voter again", async function () {
            try {
                registerVoter = await voteChain.connect(addr1).registerVoter()
            } catch (e) {
                expect(registerVoter).to.be.revertedWith(
                    "VoteChain_voterRegistereds"
                )
            }
        })
        it("should revert when registration duration has been elapsed", async () => {
            await network.provider.send("evm_increaseTime", [
                registrationDuration + 2,
            ])

            try {
                registerVoter = await voteChain.connect(addr2).registerVoter()
            } catch (e) {
                expect(registerVoter).to.be.revertedWith(
                    "VoteChain_registrationElapsed"
                )
            }
        })
    })
})
