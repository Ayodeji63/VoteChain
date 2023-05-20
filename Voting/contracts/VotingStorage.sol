// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Interfaces/IVotingStorage.sol";

contract VotingStorage is IVotingStorage {
    mapping(uint => Candidate) public candidates;
    mapping(uint => Voter) public voters;

    uint candidatesCount;

    function _registerVoter(uint _voterId) internal {
        voters[_voterId] = Voter(_voterId, false, msg.sender);
    }

    function _initializeCandidates(
        uint[] memory id,
        string[] memory name,
        uint[] memory voteCount,
        string[] memory image,
        string[] memory party,
        string[] memory position
    ) internal returns (uint) {
        for (uint i = 0; i < name.length; i++) {
            candidates[id[i]] = Candidate(
                id[i],
                name[i],
                image[i],
                party[i],
                position[i],
                voteCount[i]
            );
            candidatesCount++;
        }

        return candidatesCount;
    }

    function _getCandidateVoteCount(
        uint _candidateId
    ) public view returns (uint) {
        return candidates[_candidateId].voteCount;
    }
}
