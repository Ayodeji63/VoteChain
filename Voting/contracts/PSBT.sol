// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "./eip4671/ERC4671.sol";
import "./Interfaces/IVotingElect.sol";

contract PSBT is ERC4671 {
    IVotingElect private voteChain;

    constructor(address voteChainAddress) ERC4671("PDP VOTERS", "PDP") {
        voteChain = IVotingElect(voteChainAddress);
        _setBaseURI(
            "https://bafkreihgtu6uym7ukila7gh4u3n2smrf5wcvdvvzl5dhbdowy66grkggqu.ipfs.nftstorage.link/"
        );
    }

    event TokenMinted(address owner);

    function mintSBT(uint candidateId, address voterAddress) public {
        voteChain.castVote(candidateId, voterAddress);
        _mint(voterAddress);
        emit TokenMinted(voterAddress);
    }
}
