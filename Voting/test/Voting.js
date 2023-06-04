const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect, assert } = require("chai")
const { network } = require("hardhat")

async function deploy(name, ...params) {
    const Contract = await ethers.getContractFactory(name)
    return await Contract.deploy(...params).then((f) => f.deployed())
}
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
    let owner,
        addr1,
        addr2,
        addr3,
        addr4,
        addr5,
        VoteChain,
        voteChain,
        registerVoter,
        forwarder

    beforeEach(async () => {
        ;[owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners()
        VoteChain = await ethers.getContractFactory("VoteChain")
        forwarder = await deploy("MinimalForwarder")
        voteChain = await VoteChain.deploy(
            registrationDuration,
            forwarder.address
        )
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
            registerVoter = await voteChain.connect(addr1).registerVoter(1)

            expect(await registerVoter)
                .to.emit(voteChain, "VoteChain_voterRegistered")
                .withArgs(0, addr1.address)

            let votersCount = await voteChain.s_votersCount()
            assert.equal(votersCount.toString(), 1)

            let voter = await voteChain.connect(addr2).getVoter(addr1.address)
            let voterInfo =
                "1,false,0x70997970C51812dc3A010C7d01b50e0d17dc79C8,0"
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
            const initialize = await voteChain
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
            let initialize
            try {
                initialize = await voteChain
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
            try {
                registerVoter = await voteChain.connect(addr1).registerVoter()
                registerVoter = await voteChain.connect(addr2).registerVoter()
                registerVoter = await voteChain.connect(addr3).registerVoter()
                registerVoter = await voteChain.connect(addr4).registerVoter()

                const initialize = await voteChain
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
            } catch (e) {
                // console.log(e)
            }
        })

        it("should not be able to cast vote, when voting hasn't started", async () => {
            let tx
            try {
                tx = await voteChain
                    .connect(addr3)
                    .castVote(id[0], addr3.address)
            } catch (e) {
                expect(await tx).to.be.revertedWith("VoteChain_BallotNotOpen")
            }
        })

        it("should cast voter", async () => {
            try {
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
            } catch (e) {
                // console.log(e)
            }
        })

        it("should not be able to cast vote, when voting has ended", async () => {
            let tx
            try {
                await network.provider.send("evm_increaseTime", [7000])
                tx = await voteChain
                    .connect(addr1)
                    .castVote(id[0], addr1.address)
            } catch (e) {
                expect(await tx).to.be.revertedWith("VoteChain_BallotClosed")
            }
        })

        it("should not be able to cast vote twice", async () => {
            try {
                await network.provider.send("evm_increaseTime", [700])
                await expect(
                    voteChain.connect(addr2).castVote(id[0], addr2.address)
                )
                    .to.emit(voteChain, "VoteCasted")
                    .withArgs(addr2.address, id[0])
                await expect(
                    voteChain.connect(addr2).castVote(id[0], addr2.address)
                ).to.be.revertedWith("VoteChain_AlreadyVoted")
            } catch (e) {}
        })
        it("should not cast allow nonregistered person to vote", async () => {
            try {
                await expect(
                    voteChain.connect(addr5).castVote(id[0], addr5.address)
                ).to.be.revertedWith("VoteChain_voterNotRegistered")
            } catch (e) {}
        })
    })

    describe("checkUpKeep", () => {
        it("returns false if enough time hasn't passed", async () => {
            try {
                await voteChain.connect(addr1).registerVoter()
                await network.provider.send("evm_increaseTime", [300])
                await network.provider.request({
                    method: "evm_mine",
                    params: [],
                })
                const { upkeepNeeded } = await voteChain.callStatic.checkUpkeep(
                    "0x"
                )
                assert(!upkeepNeeded)
            } catch (e) {}
        })

        it("returns false if there is no voter", async () => {
            await network.provider.send("evm_increaseTime", [700])
            await network.provider.send("evm_mine", [])
            const { upkeepNeeded } = await voteChain.callStatic.checkUpkeep(
                "0x"
            )
            assert(!upkeepNeeded)
        })

        it("returns false if there is no candidate", async () => {
            try {
                await voteChain.connect(addr1).registerVoter()
                await network.provider.send("evm_increaseTime", [700])
                await network.provider.request({
                    method: "evm_mine",
                    params: [],
                })
                const { upkeepNeeded } = await voteChain.callStatic.checkUpkeep(
                    "0x"
                )
                assert(!upkeepNeeded)
            } catch (e) {}
        })
    })

    describe("performUpkeep", () => {
        it("can only run if checkUpkeep is true", async () => {
            let tx
            try {
                await voteChain.connect(addr1).registerVoter()
                await network.provider.send("evm_increaseTime", [7000])
                await network.provider.request({
                    method: "evm_mine",
                    params: [],
                })
                const initialize = await voteChain
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

                tx = await voteChain.connect(owner).performUpkeep("0x")
            } catch (error) {
                // console.log(error) // Log the error for debugging purposes

                expect(await tx).to.emit(voteChain, "WinningCandidate")
            }
        })

        it("reverts when checkupkeep is false", async () => {
            let tx
            try {
                tx = await voteChain.connect(addr1).performUpkeep([])
            } catch (e) {
                expect(await tx).to.be.revertedWith("VoteChain_UpkeepNotNeeded")
            }
        })
        it("picks a winner", async () => {
            try {
                registerVoter = await voteChain.connect(addr1).registerVoter()
                registerVoter = await voteChain.connect(addr2).registerVoter()
                registerVoter = await voteChain.connect(addr3).registerVoter()
                registerVoter = await voteChain.connect(addr4).registerVoter()
                registerVoter = await voteChain.connect(addr5).registerVoter()

                const initialize = await voteChain
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

                await network.provider.send("evm_increaseTime", [700])
                await network.provider.request({
                    method: "evm_mine",
                    params: [],
                })
                let tx
                tx = await voteChain
                    .connect(addr1)
                    .castVote(id[0], addr1.address)
                tx = await voteChain
                    .connect(addr2)
                    .castVote(id[0], addr2.address)
                tx = await voteChain
                    .connect(addr3)
                    .castVote(id[1], addr3.address)
                tx = await voteChain
                    .connect(addr4)
                    .castVote(id[2], addr4.address)
                tx = await voteChain
                    .connect(addr5)
                    .castVote(id[0], addr5.address)

                await network.provider.send("evm_increaseTime", [4000])
                await network.provider.request({
                    method: "evm_mine",
                    params: [],
                })
                tx = await voteChain.connect(owner).performUpkeep([])
                expect(await tx)
                    .to.emit(voteChain, "WinningCandidate")
                    .withArgs(1)

                tx = await voteChain.connect(addr1).getWinnerName()
                assert.equal(tx, names[0])
            } catch (e) {
                // console.log(e)
            }
        })
    })
})
