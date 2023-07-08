import React, { useContext, useEffect } from "react"
import { Table, Modal } from "antd"
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai"
import { useRef, useState } from "react"
import "./FinalResults.css"
// import { useNavigate } from "react-router-dom"
import Image from "next/image"
import {
    paginatedIndexesConfig,
    useContractInfiniteReads,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useAccount,
} from "wagmi"

import { watchContractEvent } from "@wagmi/core"
import {
    ASBT_ADDRESS,
    LSBT_ADDRESS,
    PSBT_ADDRESS,
    VOTE_CHAIN_ABI,
    VOTE_CHAIN_ADDRESS,
} from "@/index"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { EthereumContext } from "@/eth/context"
import { castVote } from "@/eth/register"
import { _mintToken } from "@/eth/mintSBT"
import { ClipLoader } from "react-spinners"

const FinalResults = () => {
    const [modal, contextHolder] = Modal.useModal()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState([])
    const [isVoted, setIsVoted] = useState(false)
    const [dataSet, setDataSet] = useState([])
    const [numCandidates, setNumCandidates] = useState(0)
    const [candidateId, setCandidateId] = useState(0)
    const { address } = useAccount()
    const [winningCandidate, setWinningCandidate] = useState(null)
    const [winningCandidateData, setWinningCandidateData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [txText, setTxText] = useState("")
    const [txAnimation, setTxAnimation] = useState(false)
    const [errorAnimation, seterrorAnimation] = useState(false)
    // const navigate = useNavigate()

    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

    const v_StartTime = useContractRead({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "s_votingStartTime",
    })

    const v_endTime = useContractRead({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "s_votingEndTime",
    })

    const unwatch = watchContractEvent(
        {
            address: VOTE_CHAIN_ADDRESS,
            abi: VOTE_CHAIN_ABI,
            eventName: "VoteCasted",
        },
        (logs) => {
            const { args } = logs[0]
            toast("Vote Casted", { type: "info" })
        }
    )

    const winning = watchContractEvent(
        {
            address: VOTE_CHAIN_ADDRESS,
            abi: VOTE_CHAIN_ABI,
            eventName: "WinningCandidate",
        },
        (logs) => {
            const { args } = logs[0]
            // console.log(logs)
            console.log(Number(args.candidateId))
            setWinningCandidate(Number(args.candidateId))
        }
    )
    const getTime = () => {
        const startTime = Number(v_StartTime.data)
        const unixTimestamp = v_StartTime.data
        const s_date = new Date(`${unixTimestamp}` * 1000).getTime()
        const e_date = new Date(`${v_endTime.data}` * 1000).getTime()
        const now = new Date().getTime()
        const s_distance = s_date - now
        const e_distance = e_date - now

        const s_days = Math.floor(s_distance / (1000 * 60 * 60 * 24))
        const s_hours = Math.floor(
            (s_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const s_mins = Math.floor((s_distance % (1000 * 60 * 60)) / (1000 * 60))
        const s_secs = Math.floor((s_distance % (1000 * 60)) / 1000)

        const e_days = Math.floor(e_distance / (1000 * 60 * 60 * 24))
        const e_hours = Math.floor(
            (e_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const e_mins = Math.floor((e_distance % (1000 * 60 * 60)) / (1000 * 60))
        const e_secs = Math.floor((e_distance % (1000 * 60)) / 1000)

        if (s_distance < 0) {
            setStartTime(false)
        } else {
            setStartTime(true)
        }

        if (e_distance < 0) {
            setEndTime(false)
        } else {
            setEndTime(true)
        }
    }
    setInterval(() => {
        if (address) {
            getTime()
        }
    }, 1000)

    const readCandidateCount = useContractRead({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "candidatesCount",
        onSuccess(data) {
            setNumCandidates(Number(data))
        },
    })

    const winCan = useContractRead({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "getWinningCandidateId",
        onSuccess(data) {
            for (let i = 0; i < dataSet.length; i++) {
                const element = dataSet[i]
                if (Number(data) == Number(element.result.id)) {
                    console.log(element)
                    setWinningCandidateData(element)
                }
            }
        },
    })

    const mlootContractConfig = {
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
    }

    const infinteRead = useContractInfiniteReads({
        cacheKey: "mlootAttributes",
        ...paginatedIndexesConfig(
            (index) => {
                return [
                    {
                        ...mlootContractConfig,
                        functionName: "getCandidate",
                        args: [index],
                    },
                ]
            },
            {
                start: 1,
                perPage: 3,
                direction: "increment",
            }
        ),
        onSuccess(data) {
            setDataSet(data.pages[0])
        },
        cacheTime: 2_000,
    })

    console.log(dataSet)

    const vote = usePrepareContractWrite({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "castVote",
        args: [candidateId, address],
        onError(error) {
            startTime && endTime
                ? toast("Ballot Not Open")
                : !startTime && !endTime
                ? toast("Ballot Closed")
                : toast("Your Are Not Allowed To Vote")
        },
    })

    const { registry, provider, asbt, lsbt, psbt } = useContext(EthereumContext)

    const voteTx = async (id) => {
        try {
            setLoading(true)
            const partyId = Number(id)
            setTxText("Claim Your Vote")
            const mintToken = await _mintToken(
                partyId == 1 ? lsbt : partyId == 2 ? asbt : psbt,
                partyId == 1
                    ? LSBT_ADDRESS
                    : partyId == 2
                    ? ASBT_ADDRESS
                    : PSBT_ADDRESS,
                provider,
                address
            )
            setTxText("Casting Your Vote")
            const response = await castVote(
                registry,
                provider,
                candidateId,
                address
            )

            const hash = response.hash
            // const onClick = hash ? () => window.open

            toast("Transaction sent!", { type: "info" })
            setLoading(false)
        } catch (err) {
            toast(err.message || err, { type: "error" })
            setLoading(false)
        }
    }

    const { write, isLoading, isSuccess, isError } = useContractWrite(
        vote.config
    )

    const showModal = (record) => {
        setIsModalOpen(true)
        setModalContent([record])
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setIsVoted(false)
    }
    const columns = [
        {
            title: "Name",
            dataIndex: ["name", "candidateImage"],
            key: "name",
            render: (text, record) => (
                <div className="candidate-image">
                    <img
                        src={record?.result.image || ""}
                        alt="First Candidate"
                    />
                    <a href="##">{record?.result.name || ""}</a>
                </div>
            ),
        },
        {
            title: "PARTY",
            dataIndex: "party",
            key: "party",
            render: (text, record) => <p>{record?.result.party || ""} Party</p>,
        },
        {
            title: "TOTAL VOTES",
            dataIndex: "voteCount",
            key: "voteCount",
            render: (text, record) => (
                <p>{Number(record?.result.voteCount) || 0}</p>
            ),
        },
        {
            title: "ACTION",
            key: "action",
            render: (text, record) => (
                <div>
                    <button
                        className="vote-btn"
                        onClick={() => {
                            showModal(record)
                            setCandidateId(record?.result.id || "")
                        }}
                    >
                        {isVoted ? "Voted" : "Vote"}
                    </button>
                    <Modal
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        {modalContent.map((newModal) => (
                            <div
                                className="modal-container"
                                key={newModal?.result?.image}
                            >
                                <img
                                    src={"/images/modal-icon.png"}
                                    alt="Modal Icon"
                                    className="modal-icon"
                                />
                                {/* <h4 className="modal-election-name">
                                    You are about to Vote for
                                    {newModal?.result.name || ""}
                                </h4> */}
                                {/* <img
                                    src={newModal.result.image}
                                    alt="First Candidate"
                                    className="newmodal-image"
                                /> */}
                                <div className="modal-wrapper">
                                    <ClipLoader
                                        color={"green"}
                                        loading={loading}
                                        size={100}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                    {errorAnimation && (
                                        <img
                                            src={"/error.gif"}
                                            alt="First Candidate"
                                            className="newmodal-image"
                                        />
                                    )}
                                    {txAnimation && (
                                        <img
                                            src={"/success.gif"}
                                            alt="First Candidate"
                                            className="newmodal-image"
                                        />
                                    )}
                                    <h1 className="text-2xl font-bold mt-5">
                                        {txText}
                                    </h1>
                                </div>
                                <button
                                    className={"modal-election-btn "}
                                    onClick={() => voteTx(newModal.result.id)}
                                    disabled={!endTime || startTime}
                                >
                                    {isSuccess
                                        ? "Okay, Got it"
                                        : !endTime
                                        ? "Voting Closed"
                                        : startTime
                                        ? "Voting Not Opened"
                                        : "Vote"}
                                </button>
                            </div>
                        ))}
                    </Modal>
                </div>
            ),
        },
    ]
    useEffect(() => {
        for (let i = 0; i < dataSet.length; i++) {
            const element = dataSet[i]
            if (Number(winningCandidate) == Number(element.result.id)) {
                console.log(element)
                setWinningCandidateData(element)
            }
        }
    }, [winningCandidate])

    return (
        <div className="final-results-container">
            <Link href={"/welcome"}>
                <AiOutlineArrowLeft className="arrow-left-final-results" />
            </Link>
            <div className="final-results-text-search">
                <h4>Presidential Election 2023</h4>
                <div className="search-input">
                    <AiOutlineSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search For Candidates"
                        className="search-input-tag"
                    />
                </div>
            </div>
            {winningCandidateData && (
                <div className="winning-candidate">
                    <h1>Winning Candidate</h1>
                    <div className="candidate-image">
                        <img
                            src={winningCandidateData?.result.image || ""}
                            alt="First Candidate"
                        />
                        <a href="##">
                            {winningCandidateData?.result.name || ""}
                        </a>
                        <img
                            src={"/images/modal-icon.png"}
                            alt="Modal Icon"
                            className="winning modal-icon"
                        />
                    </div>
                </div>
            )}
            <p className="aspirants">{numCandidates || ""} Aspirants</p>

            <Table
                columns={columns}
                dataSource={dataSet}
                scroll={{
                    x: 900,
                }}
            />
        </div>
    )
}

export default FinalResults
