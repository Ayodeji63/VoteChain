// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

interface IVotingStorage {
    struct Voters {
        uint id;
        bool hasVoted;
        address delegate;
    }

    struct Candidates {
        uint id;
        string name;
        string image;
        string party;
        string position;
        uint voteCount;
        // Voters voters;
    }
}
