// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Interfaces/IVotingStorage.sol";

import "hardhat/console.sol";

contract VotingStorage is IVotingStorage {
    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;

    uint public candidatesCount;

    function _registerVoter(
        uint _voterId,
        string memory _firstName,
        string memory _secondName,
        address sender
    ) internal {
        voters[sender] = Voter(
            _voterId,
            false,
            sender,
            0,
            _firstName,
            _secondName
        );
    }

    function _initializeCandidates(
        uint[] memory id,
        string[] memory name,
        string[] memory vice,
        uint[] memory voteCount,
        string[] memory image,
        string[] memory party,
        string[] memory position
    ) internal returns (uint) {
        require(
            id.length == name.length &&
                id.length == voteCount.length &&
                id.length == image.length &&
                id.length == party.length &&
                id.length == position.length,
            "Array lengths do not match"
        );
        for (uint i = 0; i < id.length; i++) {
            candidates[id[i]] = Candidate(
                id[i],
                name[i],
                vice[i],
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

    function _getCandidate(
        uint candidateId
    ) public view returns (string memory) {
        string memory name = candidates[candidateId].name;
        return name;
    }
}
