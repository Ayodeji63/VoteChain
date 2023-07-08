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
    beforeEach(async () => {
        ;[owner, addr1, addr2, addr3] = await ethers.getSigners()
        const SBT = await ethers.getContractFactory("ASBT")
        sbt = await SBT.deploy()
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
                let tx = await sbt._mint(addr1.address)
                expect(await tx)
                    .to.emit(sbt, "TokenMinted")
                    .withArgs(addr1.address, 1)
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
