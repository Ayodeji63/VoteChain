// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "./eip4671/ERC4671.sol";
import "./Interfaces/IVotingElect.sol";

contract ASBT is ERC4671 {
    constructor() ERC4671("APC VOTERS", "APV") {
        _setBaseURI(
            "https://bafkreiga62jgpp4dlaz36fh75x6uwcp7u4dodqhr57nlx36fuy6azzk5fe.ipfs.nftstorage.link/"
        );
    }
}
