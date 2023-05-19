// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Interfaces/IVotingElect.sol";
import "./VotingStorage.sol";

contract VotingElect is VotingStorage, IVotingElect {
    constructor() {}

    function castVote(uint _candidateId, uint _voterId) external override {}

    function initializeCandidate(
        uint id,
        string memory name,
        uint voteCount,
        string memory image,
        string memory party,
        string memory position
    ) external override {}

    function winnigCandidate() external override {}
}
