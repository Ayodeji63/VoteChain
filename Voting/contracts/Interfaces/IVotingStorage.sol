// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

interface IVotingStorage {
    struct Voter {
        uint id;
        bool hasVoted;
        address delegate;
        uint votedCandidate;
    }

    struct Candidate {
        uint id;
        string name;
        string vice;
        string image;
        string party;
        string position;
        uint voteCount;
        // Voters voters;
    }
}
