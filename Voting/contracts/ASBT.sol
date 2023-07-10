// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "./eip4671/ERC4671.sol";
import "./Interfaces/IVotingElect.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

contract ASBT is ERC4671, ERC2771Context {
    constructor(
        MinimalForwarder forwarder
    ) ERC2771Context(address(forwarder)) ERC4671("APC VOTERS", "APV") {
        _setBaseURI(
            "https://bafkreiga62jgpp4dlaz36fh75x6uwcp7u4dodqhr57nlx36fuy6azzk5fe.ipfs.nftstorage.link/"
        );
    }
}
