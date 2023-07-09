// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "./eip4671/ERC4671.sol";
import "./Interfaces/IVotingElect.sol";

contract ASBT is ERC4671 {
    constructor() ERC4671("APC VOTERS", "APV") {
        _setBaseURI(
            "https://bafkreihfbb3qqng3xnaecjlar34hgajwcj3rkrtdpi4rhvghqfl4kftzgy.ipfs.nftstorage.link/"
        );
    }
}
