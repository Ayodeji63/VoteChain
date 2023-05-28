// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Interfaces/IVotingElect.sol";
import "./VotingStorage.sol";
import "hardhat/console.sol";

error VoteChain_voterRegistered();
error VoteChain_registrationElapsed();
error VoteChain_onlyChairperson();
error VoteChain_BallotNotOpen();
error VoteChain_BallotClosed();
error VoteChain_AlreadyVoted();

contract VoteChain is VotingStorage, IVotingElect {
    address public immutable i_chairperson;
    uint public immutable i_registrationDuration;
    uint public s_votersCount;
    uint public s_votingStartTime;
    uint public s_votingEndTime;

    event VoterRegistered(uint indexed id, address indexed votersAddress);
    event CandidatesRegistered(uint indexed count);
    event VoteCasted(address voterAddress, uint candidateId);

    constructor(uint registrationDuration) {
        i_chairperson = msg.sender;
        i_registrationDuration = registrationDuration;
    }

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
        string[] memory vice,
        uint[] memory voteCount,
        string[] memory image,
        string[] memory party,
        string[] memory position,
        uint votingStartTime,
        uint votingEndTime
    ) public returns (uint) {
        onlyOwner();
        for (uint i = 0; i < name.length; i++) {
            require(!containsCandidate(id[i]), "Candidates ID already exists.");
        }
        s_votingStartTime = votingStartTime;
        s_votingEndTime = votingEndTime;
        uint count = _initializeCandidates(
            id,
            name,
            vice,
            voteCount,
            image,
            party,
            position
        );
        emit CandidatesRegistered(count);
        return count;
    }

    function castVote(uint _candidateId, address _voterAddress) public {
        console.log(block.timestamp);
        if (block.timestamp < s_votingStartTime) {
            revert VoteChain_BallotNotOpen();
        }
        if (block.timestamp >= s_votingEndTime) {
            revert VoteChain_BallotClosed();
        }

        Voter storage sender = voters[msg.sender];
        if (containsVoter()) {
            revert VoteChain_voterRegistered();
        }
        if (sender.hasVoted) {
            revert VoteChain_AlreadyVoted();
        }
        sender.hasVoted = true;
        sender.votedCandidate = _candidateId;
        candidates[_candidateId].voteCount++;

        emit VoteCasted(_voterAddress, _candidateId);
    }

    function containsCandidate(uint id) public view returns (bool) {
        return candidates[id].id != 0;
    }

    function containsVoter() public view returns (bool) {
        return voters[msg.sender].delegate != address(0);
    }

    function winnigCandidate() external override {}

    function votingDuration() external override {}

    /** View/Pure Functions */
    function onlyOwner() internal view {
        if (msg.sender != i_chairperson) {
            revert VoteChain_onlyChairperson();
        }
    }

    function getCandidate(
        uint candidateId
    ) public view returns (Candidate memory) {
        return candidates[candidateId];
    }

    function getVoter(address voterAddress) public view returns (Voter memory) {
        return voters[voterAddress];
    }
}
