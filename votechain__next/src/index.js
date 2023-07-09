export const VOTE_CHAIN_ADDRESS = "0x8b5aef3FbAf7a58db79Fde7Dd771d8Afd19E6bf9"
export const ASBT_ADDRESS = "0x8E07CBa3117E2f5cC087b411Ab8E084f2883f0d9"
export const LSBT_ADDRESS = "0x179C42aed161738B6F65648cBD385b14AaEF8d30"
export const PSBT_ADDRESS = "0xa1D088A5507c0931B400c2644bd4c3d7576f5851"
export const VOTE_CHAIN_ABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "registrationDuration",
                type: "uint256",
            },
            {
                internalType: "contract MinimalForwarder",
                name: "forwarder",
                type: "address",
            },
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
        inputs: [],
        name: "VoteChain_NINNumberNotDefined",
        type: "error",
    },
    {
        inputs: [],
        name: "VoteChain_NameNotDefined",
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
            {
                indexed: false,
                internalType: "string",
                name: "_firstName",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "_secondName",
                type: "string",
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
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
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
        inputs: [],
        name: "getTotalVoteCount",
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
                    {
                        internalType: "string",
                        name: "firstName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "SecondName",
                        type: "string",
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
            {
                internalType: "string",
                name: "_firstName",
                type: "string",
            },
            {
                internalType: "string",
                name: "_secondName",
                type: "string",
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
            {
                internalType: "string",
                name: "firstName",
                type: "string",
            },
            {
                internalType: "string",
                name: "SecondName",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
]

export const SBT_ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "voteChainAddress",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Minted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Revoked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "TokenMinted",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "_mint",
        outputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "uri",
                type: "string",
            },
        ],
        name: "_setBaseURI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "_uri",
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
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
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
        name: "emittedCount",
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
                name: "owner",
                type: "address",
            },
        ],
        name: "hasValid",
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
        name: "holdersCount",
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
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "isValid",
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
            {
                internalType: "address",
                name: "voterAddress",
                type: "address",
            },
        ],
        name: "mintSBT",
        outputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
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
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
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
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
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
        name: "symbol",
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
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenByIndex",
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
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenOfOwnerByIndex",
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
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
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
]
