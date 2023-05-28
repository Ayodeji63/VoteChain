const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect, assert } = require("chai")
const { network } = require("hardhat")

describe("voteChain", function () {
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

            let votersCount = await voteChain.s_votersCount()
            assert.equal(votersCount.toString(), 1)

            let voter = await voteChain.connect(addr2).getVoter(addr1.address)
            let voterInfo =
                "0,false,0x70997970C51812dc3A010C7d01b50e0d17dc79C8,0"
            assert.equal(voter.toString(), voterInfo)
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
            try {
                await network.provider.send("evm_increaseTime", [300 + 2])
                registerVoter = await voteChain.connect(addr2).registerVoter()
            } catch (e) {
                expect(registerVoter).to.be.revertedWith(
                    "VoteChain_registrationElapsed"
                )
            }
        })
    })

    describe("Initialize Candidates", () => {
        it("should initialize candidates properly", async () => {
            const initialize = voteChain
                .connect(owner)
                .initializeCandidates(
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

            expect(await initialize)
                .to.emit(voteChain, "CandidatesRegistered")
                .withArgs(3)

            const candidate = await voteChain.connect(addr2).getCandidate(1)
            const thisCandidate = "1,Buhari,Shettima,,APC,President,0"
            assert.equal(candidate.toString(), thisCandidate)
        })
        it("should revert if caller isn't chairperson", async () => {
            try {
                const initialize = voteChain
                    .connect(addr1)
                    .initializeCandidates(
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
            } catch (e) {
                expect(await initialize).to.be.revertedWith(
                    "VoteChain_onlyChairperson"
                )
            }
        })
    })

    describe("Cast votes", () => {
        beforeEach(async () => {
            registerVoter = voteChain.connect(addr1).registerVoter()
            registerVoter = voteChain.connect(addr2).registerVoter()
            registerVoter = voteChain.connect(addr3).registerVoter()
            registerVoter = voteChain.connect(addr4).registerVoter()

            const initialize = voteChain
                .connect(owner)
                .initializeCandidates(
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
        })
        it("should cast voter", async () => {
            await network.provider.send("evm_increaseTime", [700])
            await expect(
                voteChain.connect(addr1).castVote(id[0], addr1.address)
            )
                .to.emit(voteChain, "VoteCasted")
                .withArgs(addr1.address, id[0])

            await expect(
                voteChain.connect(addr2).castVote(id[0], addr2.address)
            )
                .to.emit(voteChain, "VoteCasted")
                .withArgs(addr2.address, id[0])
        })

        it("should not be able to cast vote, when voting hasn't started", async () => {
            try {
                await expect(
                    voteChain.connect(addr3).castVote(id[0], addr3.address)
                ).to.be.revertedWith("VoteChain_BallotNotOpen")
            } catch (e) {}
        })

        it("should not be able to cast vote, when voting has ended", async () => {
            try {
                await network.provider.send("evm_increaseTime", [4700])
                await expect(
                    voteChain.connect(addr4).castVote(id[0], addr4.address)
                ).to.be.revertedWith("VoteChain_BallotClosed")
            } catch (e) {}
        })
    })
})
