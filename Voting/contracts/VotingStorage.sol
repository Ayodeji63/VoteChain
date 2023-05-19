// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Interfaces/IVotingStorage.sol";

contract VotingStorage is IVotingStorage {
    mapping(uint => Candidates) public candidates;
    mapping(uint => Voters) public voters;

    function _registerVoter(uint _voterId) internal {
        require(
            !voters[_voterId].hasVoted,
            "Voter has already cast their votes."
        );
        voters[_voterId] = Voters(_voterId, false, msg.sender);
    }

    function _initializeCandidates(
        uint id,
        string memory name,
        uint voteCount,
        string memory image,
        string memory party,
        string memory position
    ) internal returns (Candidates memory) {
        candidates[id] = Candidates(
            id,
            name,
            image,
            party,
            position,
            voteCount
        );
        return candidates[id];
    }

    function _getCandidateVoteCount(
        uint _candidateId
    ) public view returns (uint) {
        return candidates[_candidateId].voteCount;
    }
}
