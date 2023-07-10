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
    ASBT_ABI,
    ASBT_ADDRESS,
    LSBT_ABI,
    LSBT_ADDRESS,
    PSBT_ABI,
    PSBT_ADDRESS,
    SBT_ABI,
    VOTE_CHAIN_ABI,
    VOTE_CHAIN_ADDRESS,
} from "@/index"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { EthereumContext } from "@/eth/context"
import { castVote } from "@/eth/register"
import { _mintToken } from "@/eth/mintSBT"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/navigation"
import { Contract, providers } from "ethers"
import { Context } from "@/eth/candidate"

const FinalResults = () => {
    let userProvider

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
    const [favCandidate, setFavCandidate] = useState(false)
    const [favId, setFavId] = useState(0)
    const [badgeImage, setBadgeImage] = useState("")
    const router = useRouter()
    // const navigate = useNavigate()
    if (address) {
        userProvider = new providers.Web3Provider(window.ethereum)
    }
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

    const mlootContractConfig = {
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
    }

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

    // ========= Read Contract ==========
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

    const supplyL = useContractRead({
        address: LSBT_ADDRESS,
        abi: LSBT_ABI,
        functionName: "holdersCount",
    })

    const supplyA = useContractRead({
        address: ASBT_ADDRESS,
        abi: ASBT_ABI,
        functionName: "holdersCount",
    })

    const supplyP = useContractRead({
        address: PSBT_ADDRESS,
        abi: PSBT_ABI,
        functionName: "holdersCount",
    })

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
            console.log(data)
            setWinningCandidateData(Number(data))
        },
    })

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
            console.log(data.pages[0].result)
            getJsonData(data.pages[0])
        },
        cacheTime: 2_000,
    })

    async function getJsonData(data) {
        const arr = []
        for (let i = 0; i < data.length; i++) {
            const element = data[i].result
            const jsonData = await logJSONData(element.image)
            const arrEl = { ...data[i].result, jsonData }
            arr.push(arrEl)
        }
        console.log(arr)
        setDataSet(arr)
    }

    async function logJSONData(uri) {
        const response = await fetch(uri)
        const jsonData = await response.json()
        return jsonData
    }
    async function getTokensUri(contractAddress, abi) {
        try {
            const signer = userProvider.getSigner()
            const contract = new Contract(contractAddress, abi, signer)

            const tx = await contract._uri()
            console.log(tx)
            const data = await logJSONData(tx)
            setBadgeImage(data.image)
            return tx
        } catch (e) {
            console.log(e)
        }
    }

    console.log(badgeImage)

    // ======== Watch Event ==========

    const mintA = watchContractEvent(
        {
            address: ASBT_ADDRESS,
            abi: ASBT_ABI,
            eventName: "Minted",
        },
        (logs) => {
            const { args } = logs[0]
            setLoading(false)
            setTxText("Vote Casted.")
            setTxAnimation(true)
        }
    )

    const mintL = watchContractEvent(
        {
            address: LSBT_ADDRESS,
            abi: LSBT_ABI,
            eventName: "Minted",
        },
        (logs) => {
            const { args } = logs[0]
            setLoading(false)
            setTxText("Vote Casted.")
            setTxAnimation(true)
        }
    )

    const mintP = watchContractEvent(
        {
            address: PSBT_ADDRESS,
            abi: PSBT_ABI,
            eventName: "Minted",
        },
        (logs) => {
            const { args } = logs[0]
            setLoading(false)
            setTxText("Vote Casted.")
            setTxAnimation(true)
        }
    )

    // const VoteCasted = watchContractEvent(
    //     {
    //         address: VOTE_CHAIN_ADDRESS,
    //         abi: VOTE_CHAIN_ABI,
    //         eventName: "VoteCasted",
    //     },
    //     (logs) => {
    //         const { args } = logs[0]
    //         setLoading(false)
    //         setTxText("Vote Casted.")
    //         setTxAnimation(true)
    //     }
    // )

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

    // ========= Write To Contract ======
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

    const { write, isLoading, isSuccess, isError } = useContractWrite(
        vote.config
    )
    const { registry, provider, asbt, lsbt, psbt } = useContext(EthereumContext)
    const { candidateInfo, setCandidateInfo } = useContext(Context)
    const voteTx = async (id) => {
        try {
            setFavCandidate(false)
            setLoading(true)
            const partyId = Number(id)
            let sbtToken, sbtTokenAddress, abi
            if (partyId == 1) {
                sbtToken = lsbt
                sbtTokenAddress = LSBT_ADDRESS
                abi = LSBT_ABI
            }
            if (partyId == 2) {
                sbtToken = asbt
                sbtTokenAddress = ASBT_ADDRESS
                abi = ASBT_ABI
            }
            if (partyId == 3) {
                sbtToken = psbt
                sbtTokenAddress = PSBT_ADDRESS
                abi = PSBT_ABI
            }

            console.log(sbtToken)
            console.log(sbtTokenAddress)

            setTxText("Casting Your Vote")
            await castVote(registry, provider, id, address)

            await getTokensUri(sbtTokenAddress, abi)
            setTxText("Claiming Your Vote")
            await _mintToken(sbtToken, sbtTokenAddress, provider, address)

            // const onClick = hash ? () => window.open

            toast("Transaction sent!", { type: "info" })
        } catch (err) {
            seterrorAnimation(true)
            console.log(err)
            setTxText("An Error Occured")
            setLoading(false)
        }
    }

    const showModal = (record) => {
        setFavCandidate(true)
        setIsModalOpen(true)
        setModalContent([record])
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setIsVoted(false)
        seterrorAnimation(false)
        setTxText("")
        setTxAnimation(false)
    }

    const showParty = (info) => {
        setCandidateInfo(info)
        router.push("/partyInfo")
    }
    const columns = [
        {
            title: "Logo",
            dataIndex: ["name", "candidateImage"],
            key: "logo",
            render: (text, record) => (
                <div
                    className="candidate-image cursor-pointer"
                    onClick={() => showParty(record)}
                    key={record?.id}
                >
                    <img
                        src={record?.jsonData.partyImage || ""}
                        alt="First Candidate"
                        className="w-[10rem]"
                    />
                </div>
            ),
        },
        {
            title: "PARTY",
            dataIndex: "party",
            key: "party",
            render: (text, record) => (
                <p onClick={() => showParty(record)} className="cursor-pointer">
                    {record?.party || ""} Party
                </p>
            ),
        },
        {
            title: "TOTAL VOTES",
            dataIndex: "voteCount",
            key: "voteCount",
            render: (text, record) => <p>{Number(record?.voteCount) || 0}</p>,
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
                            setCandidateId(record?.id || "")
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
                                key={newModal?.image}
                            >
                                <img
                                    src={"/images/modal-icon.png"}
                                    alt="Modal Icon"
                                    className="modal-icon"
                                />
                                {favCandidate && (
                                    <div>
                                        <h4 className="modal-election-name">
                                            You are about to Vote for{" "}
                                            {newModal?.name || ""}
                                        </h4>
                                        <img
                                            src={newModal?.jsonData.Pimage}
                                            alt="First Candidate"
                                            className="newmodal-image"
                                        />
                                    </div>
                                )}
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
                                        <div className="flex">
                                            <img
                                                src={badgeImage}
                                                alt="BadgeImage"
                                                className="newmodal-image"
                                            />
                                        </div>
                                    )}
                                    <h1 className="text-2xl font-bold mt-5">
                                        {txText}
                                    </h1>
                                </div>

                                <button
                                    className={"modal-election-btn "}
                                    onClick={() => voteTx(newModal.id)}
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
            if (Number(winningCandidate) == Number(element.id)) {
                console.log(element)
                setWinningCandidateData(Number(element.id))
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
                <div className="winning-candidate w-full">
                    <div className="w-[80%]">
                        <img
                            src={`/winner${winningCandidateData}.png`}
                            className="w-full h-full object-contain"
                            alt="First Candidate"
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
