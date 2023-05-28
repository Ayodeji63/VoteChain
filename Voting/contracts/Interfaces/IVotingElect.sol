// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IVotingStorage.sol";

interface IVotingElect is IVotingStorage {
    function castVote(uint _candidateId, address voterAddress) external;

    function initializeCandidates(
        uint[] memory id,
        string[] memory name,
        string[] memory vice,
        uint[] memory voteCount,
        string[] memory image,
        string[] memory party,
        string[] memory position,
        uint votingStartTime,
        uint votingEndTime
    ) external returns (uint);

    function winnigCandidate() external;

    function votingDuration() external;
}
