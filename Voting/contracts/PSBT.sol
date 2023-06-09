// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "./eip4671/ERC4671.sol";
import "./Interfaces/IVotingElect.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

contract PSBT is ERC4671, ERC2771Context {
    constructor(
        MinimalForwarder forwarder
    ) ERC2771Context(address(forwarder)) ERC4671("PDP VOTERS", "PDP") {
        _setBaseURI(
            "https://bafkreifll5ctuz76wm4cfx6poas3faglvpl4tutdo4ov2x6x7wnl5slhxe.ipfs.nftstorage.link/"
        );
    }
}
