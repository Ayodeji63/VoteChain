// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Interfaces/IVotingElect.sol";
import "./VotingStorage.sol";

error VoteChain_voterRegistered();
error VoteChain_registrationElapsed();

contract VoteChain is VotingStorage, IVotingElect {
    address public immutable i_chairperson;
    uint public immutable i_registrationDuration;
    uint public s_votersCount;

    constructor(uint registrationDuration) {
        i_chairperson = msg.sender;
        i_registrationDuration = registrationDuration;
    }

    event VoterRegistered(uint indexed id, address indexed votersAddress);
    event CandidatesRegistered(uint count);
    event VoteCasted(uint voterId, uint candidateId);
    uint _votingStartTime;
    uint _votingEndTime;

    function registerVoter() public {
        if (containsVoter()) {
            revert VoteChain_voterRegistered();
        }
        if (i_registrationDuration <= block.timestamp) {
            revert VoteChain_registrationElapsed();
        }

        _registerVoter(s_votersCount);
        emit VoterRegistered(s_votersCount, msg.sender);
        s_votersCount++;
    }

    function initializeCandidates(
        uint[] memory id,
        string[] memory name,
        uint[] memory voteCount,
        string[] memory image,
        string[] memory party,
        string[] memory position,
        uint votingStartTime,
        uint votingEndTime
    ) public returns (uint) {
        for (uint i = 0; i < name.length; i++) {
            require(!containsCandidate(id[i]), "Candidates ID already exists.");
        }
        _votingStartTime = votingStartTime;
        _votingEndTime = votingEndTime;
        uint count = _initializeCandidates(
            id,
            name,
            voteCount,
            image,
            party,
            position
        );
        emit CandidatesRegistered(count);
        return count;
    }

    function containsCandidate(uint id) public view returns (bool) {
        return candidates[id].id != 0;
    }

    function containsVoter() public view returns (bool) {
        return voters[msg.sender].delegate != address(0);
    }

    function winnigCandidate() external override {}

    function votingDuration() external override {}

    function castVote(uint _candidateId, uint _voterId) public {
        require(containsVoter(), "Voter Not Registered");

        emit VoteCasted(_voterId, _candidateId);
    }
}
