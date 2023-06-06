export const VOTE_CHAIN_ADDRESS = "0x96D851fd1C12Fadc5334eC711659a89b4011cbda"

export const VOTE_CHAIN_ABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "registrationDuration",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "trustedForwarder",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "VoteChain_AlreadyVoted",
        type: "error",
    },
    {
        inputs: [],
        name: "VoteChain_BallotClosed",
        type: "error",
    },
    {
        inputs: [],
        name: "VoteChain_BallotNotOpen",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "voterCount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "candidatesCount",
                type: "uint256",
            },
        ],
        name: "VoteChain_UpkeepNotNeeded",
        type: "error",
    },
    {
        inputs: [],
        name: "VoteChain_onlyChairperson",
        type: "error",
    },
    {
        inputs: [],
        name: "VoteChain_registrationElapsed",
        type: "error",
    },
    {
        inputs: [],
        name: "VoteChain_voterNotRegistered",
        type: "error",
    },
    {
        inputs: [],
        name: "VoteChain_voterRegistered",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "count",
                type: "uint256",
            },
        ],
        name: "CandidatesRegistered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "voterAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "candidateId",
                type: "uint256",
            },
        ],
        name: "VoteCasted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "votersAddress",
                type: "address",
            },
        ],
        name: "VoterRegistered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "candidateId",
                type: "uint256",
            },
        ],
        name: "WinningCandidate",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "candidateId",
                type: "uint256",
            },
        ],
        name: "_getCandidate",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_candidateId",
                type: "uint256",
            },
        ],
        name: "_getCandidateVoteCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "candidates",
        outputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "vice",
                type: "string",
            },
            {
                internalType: "string",
                name: "image",
                type: "string",
            },
            {
                internalType: "string",
                name: "party",
                type: "string",
            },
            {
                internalType: "string",
                name: "position",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "voteCount",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "candidatesCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_candidateId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_voterAddress",
                type: "address",
            },
        ],
        name: "castVote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "checkUpkeep",
        outputs: [
            {
                internalType: "bool",
                name: "upKeepNeeded",
                type: "bool",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "containsCandidate",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "containsVoter",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "candidateId",
                type: "uint256",
            },
        ],
        name: "getCandidate",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "vice",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "image",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "party",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "position",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "voteCount",
                        type: "uint256",
                    },
                ],
                internalType: "struct IVotingStorage.Candidate",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getRegistrationDuration",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "voterAddress",
                type: "address",
            },
        ],
        name: "getVoter",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "bool",
                        name: "hasVoted",
                        type: "bool",
                    },
                    {
                        internalType: "address",
                        name: "delegate",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "votedCandidate",
                        type: "uint256",
                    },
                ],
                internalType: "struct IVotingStorage.Voter",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getVotingEndTime",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getVotingStartTime",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getWinnerName",
        outputs: [
            {
                internalType: "string",
                name: "winnerName",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getWinningCandidateId",
        outputs: [
            {
                internalType: "uint256",
                name: "winningCandidate",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "i_chairperson",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "i_registrationDuration",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "id",
                type: "uint256[]",
            },
            {
                internalType: "string[]",
                name: "name",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "vice",
                type: "string[]",
            },
            {
                internalType: "uint256[]",
                name: "voteCount",
                type: "uint256[]",
            },
            {
                internalType: "string[]",
                name: "image",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "party",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "position",
                type: "string[]",
            },
            {
                internalType: "uint256",
                name: "votingStartTime",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "votingEndTime",
                type: "uint256",
            },
        ],
        name: "initializeCandidates",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "forwarder",
                type: "address",
            },
        ],
        name: "isTrustedForwarder",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "performUpkeep",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "voterId",
                type: "uint256",
            },
        ],
        name: "registerVoter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "s_votersCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "s_votingEndTime",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "s_votingStartTime",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "s_winningCandidate",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "voters",
        outputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "hasVoted",
                type: "bool",
            },
            {
                internalType: "address",
                name: "delegate",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "votedCandidate",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
]
