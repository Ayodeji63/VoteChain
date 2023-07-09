// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "./eip4671/ERC4671.sol";
import "./Interfaces/IVotingElect.sol";

contract ASBT is ERC4671 {
    IVotingElect private voteChain;
    event TokenMinted(address owner, uint tokenId);

    constructor(address voteChainAddress) ERC4671("APC VOTERS", "APV") {
        voteChain = IVotingElect(voteChainAddress);
        _setBaseURI(
            "https://bafkreihfbb3qqng3xnaecjlar34hgajwcj3rkrtdpi4rhvghqfl4kftzgy.ipfs.nftstorage.link/"
        );
    }

    function mintSBT(
        uint candidateId,
        address voterAddress
    ) public returns (uint tokenId) {
        voteChain.castVote(candidateId, voterAddress);

        tokenId = _mint(voterAddress);
        emit TokenMinted(voterAddress, tokenId);
    }
}
