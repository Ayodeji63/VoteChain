const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect } = require("chai")

describe("VotingElect", function () {
    async function deployVotingElect() {
        // Contracts are deployed using the first signer/account by default
        const [owner, addr1, add2, add3] = await ethers.getSigners()

        const VotingElect = await ethers.getContractFactory("VotingElect")
        const votingElect = await VotingElect.deploy()

        return { votingElect, owner, addr1, add2, add3 }
    }

    describe("Deployment", function () {
        it("Should set the right unlockTime", async function () {
            const { votingElect, owner } = await loadFixture(deployVotingElect)

            expect(await votingElect.chairperson()).to.equal(owner.address)
        })

        it("Should Register Voters", async function () {
            const { votingElect, owner, addr1, add2, add3 } = await loadFixture(
                deployVotingElect
            )
            let registerVoter = await votingElect
                .connect(addr1)
                .registerVoter(1)
            expect(await registerVoter)
                .to.emit(votingElect, "VoterRegistered")
                .withArgs(1)
            registerVoter = await votingElect.connect(add2).registerVoter(2)
            expect(await registerVoter)
                .to.emit(votingElect, "VoterRegistered")
                .withArgs(2)
            registerVoter = await votingElect.connect(add3).registerVoter(3)
            expect(await registerVoter)
                .to.emit(votingElect, "VoterRegistered")
                .withArgs(3)
        })

        it("Should not register, registered voters", async () => {
            const { votingElect, owner, addr1, add2, add3 } = await loadFixture(
                deployVotingElect
            )
            let registerVoter = await votingElect
                .connect(addr1)
                .registerVoter(1)
            expect(await registerVoter).to.be.revertedWith(
                "Voter already registered"
            )

            registerVoter = await votingElect.connect(add2).registerVoter(2)

            expect(await registerVoter).to.be.revertedWith(
                "Voter already registered"
            )
        })
    })
})
