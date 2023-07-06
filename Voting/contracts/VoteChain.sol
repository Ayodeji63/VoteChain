// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Interfaces/IVotingElect.sol";
import "./VotingStorage.sol";
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

error VoteChain_voterNotRegistered();
error VoteChain_voterRegistered();
error VoteChain_registrationElapsed();
error VoteChain_onlyChairperson();
error VoteChain_BallotNotOpen();
error VoteChain_BallotClosed();
error VoteChain_AlreadyVoted();
error VoteChain_UpkeepNotNeeded(uint voterCount, uint candidatesCount);
error VoteChain_NameNotDefined();
error VoteChain_NINNumberNotDefined();

contract VoteChain is
    VotingStorage,
    IVotingElect,
    AutomationCompatibleInterface,
    ERC2771Context
{
    address public immutable i_chairperson;
    uint public immutable i_registrationDuration;
    uint public s_votersCount;
    uint public s_votingStartTime;
    uint public s_votingEndTime;
    uint public s_winningCandidate;

    event VoterRegistered(
        uint indexed id,
        address indexed votersAddress,
        string _firstName,
        string _secondName
    );
    event CandidatesRegistered(uint indexed count);
    event VoteCasted(address voterAddress, uint candidateId);
    event WinningCandidate(uint candidateId);

    constructor(
        uint registrationDuration,
        MinimalForwarder forwarder
    ) ERC2771Context(address(forwarder)) {
        i_chairperson = _msgSender();
        i_registrationDuration = registrationDuration;
    }

    function registerVoter(
        uint voterId,
        string memory _firstName,
        string memory _secondName
    ) public {
        if (!containsVoter(_msgSender())) {
            revert VoteChain_voterRegistered();
        }
        if (block.timestamp > i_registrationDuration) {
            revert VoteChain_registrationElapsed();
        }

        if (voterId == 0) revert VoteChain_NINNumberNotDefined();
        if (bytes(_firstName).length < 0 && bytes(_secondName).length < 0)
            revert VoteChain_NameNotDefined();

        _registerVoter(voterId, _firstName, _secondName, _msgSender());
        emit VoterRegistered(
            s_votersCount,
            _msgSender(),
            _firstName,
            _secondName
        );
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
        // console.log(block.timestamp);
        if (block.timestamp < s_votingStartTime) {
            revert VoteChain_BallotNotOpen();
        }
        if (block.timestamp >= s_votingEndTime) {
            revert VoteChain_BallotClosed();
        }

        Voter storage sender = voters[_msgSender()];
        if (containsVoter(_msgSender())) {
            revert VoteChain_voterNotRegistered();
        }
        if (sender.hasVoted) {
            revert VoteChain_AlreadyVoted();
        }
        sender.hasVoted = true;
        sender.votedCandidate = _candidateId;
        candidates[_candidateId].voteCount++;

        emit VoteCasted(_voterAddress, _candidateId);
    }

    function checkUpkeep(
        bytes memory /*checkData*/
    ) public view returns (bool upKeepNeeded, bytes memory /**performData */) {
        bool timePassed = (block.timestamp > s_votingEndTime);
        console.log(s_votingEndTime);
        console.log(block.timestamp);
        bool hasVoters = s_votersCount > 0;
        bool hasCandidates = candidatesCount > 0;
        upKeepNeeded = (timePassed && hasCandidates && hasVoters);
    }

    function performUpkeep(bytes memory /**performData */) external override {
        (bool upKeepNeeded, ) = checkUpkeep("");
        if (!upKeepNeeded) {
            revert VoteChain_UpkeepNotNeeded(s_votersCount, candidatesCount);
        }
        uint winningVoteCount = 0;
        for (uint i = 0; i < candidatesCount; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                s_winningCandidate = i;
            }
        }

        emit WinningCandidate(s_winningCandidate);
    }

    /**Modifier Functions */
    function containsCandidate(uint id) public view returns (bool) {
        return candidates[id].id != 0;
    }

    function containsVoter(address sender) public view returns (bool) {
        return voters[sender].delegate == address(0);
    }

    function onlyOwner() internal view {
        if (_msgSender() != i_chairperson) {
            revert VoteChain_onlyChairperson();
        }
    }

    /** View/Pure Functions */

    function getCandidate(
        uint candidateId
    ) public view returns (Candidate memory) {
        return candidates[candidateId];
    }

    function getVoter(address voterAddress) public view returns (Voter memory) {
        return voters[voterAddress];
    }

    function getVotingStartTime() public view returns (uint256) {
        return s_votingStartTime;
    }

    function getVotingEndTime() public view returns (uint256) {
        return s_votingEndTime;
    }

    function getRegistrationDuration() public view returns (uint) {
        return i_registrationDuration;
    }

    function getWinnerName() public view returns (string memory winnerName) {
        winnerName = candidates[s_winningCandidate].name;
    }

    function getWinningCandidateId()
        public
        view
        returns (uint winningCandidate)
    {
        winningCandidate = s_winningCandidate;
    }

    function getTotalVoteCount() public view returns (uint) {
        uint totalVotes = 0;
        for (uint i = 0; i < candidatesCount; i++) {
            totalVotes += candidates[i].voteCount;
        }
        return totalVotes;
    }
}
