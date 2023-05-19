// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IVotingStorage.sol";

interface IVotingElect is IVotingStorage {
    function castVote(uint _candidateId, uint _voterId) external;

    function initializeCandidate(
        uint id,
        string memory name,
        uint voteCount,
        string memory image,
        string memory party,
        string memory position
    ) external;

    function winnigCandidate() external;
}
