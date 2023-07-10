// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "./eip4671/ERC4671.sol";
import "./Interfaces/IVotingElect.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

contract LSBT is ERC4671, ERC2771Context {
    constructor(
        MinimalForwarder forwarder
    ) ERC2771Context(address(forwarder)) ERC4671("LABOUR VOTERS", "LPV") {
        _setBaseURI(
            "https://bafkreig3sacvsrsgdr7rsb6rnu5blhpztvci7ehv4vtvgm5mwemlatwbli.ipfs.nftstorage.link/"
        );
    }
}
