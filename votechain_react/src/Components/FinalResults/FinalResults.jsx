import React from "react"
import { Table, Modal } from "antd"
import { AiOutlineSearch } from "react-icons/ai"
import { useRef, useState } from "react"
import "./FinalResults.css"
import modalIcon from "../../images/modal-icon.png"
import { data } from "./data"
import {
    paginatedIndexesConfig,
    useContractInfiniteReads,
    useContractRead,
} from "wagmi"
import { VOTE_CHAIN_ABI, VOTE_CHAIN_ADDRESS } from "../../.."

const FinalResults = () => {
    const [modal, contextHolder] = Modal.useModal()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState([])
    const [isVoted, setIsVoted] = useState(false)
    const [dataSet, setDataSet] = useState([])
    const [numCandidates, setNumCandidates] = useState(0)

    const readCandidateCount = useContractRead({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "candidatesCount",
        onSuccess(data) {
            setNumCandidates(Number(data))
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

    const showModal = (record) => {
        setIsModalOpen(true)
        setModalContent([record])
    }
    const handleSuccess = () => {
        setIsVoted(true)
        setTimeout(() => {
            setIsModalOpen(false)
        }, 1000)
    }
    const handleOk = () => {
        setIsModalOpen(false)
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
                    <img src={record.result.image} alt="First Candidate" />
                    <a href="##">{record.result.name}</a>
                </div>
            ),
        },
        {
            title: "PARTY",
            dataIndex: "party",
            key: "party",
            render: (text, record) => <p>{record.result.party} Party</p>,
        },
        {
            title: "TOTAL VOTES",
            dataIndex: "voteCount",
            key: "voteCount",
            render: (text, record) => <p>{Number(record.result.voteCount)}</p>,
        },
        {
            title: "ACTION",
            key: "action",
            render: (text, record) => (
                <div>
                    <button
                        className="vote-btn"
                        onClick={() => showModal(record)}
                    >
                        {isVoted ? "Voted" : "Vote"}
                    </button>
                    <Modal
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        {modalContent.map((newModal) => (
                            <div className="modal-container">
                                <img src={modalIcon} alt="Modal Icon" />
                                <h4 className="modal-election-name">
                                    {isVoted
                                        ? "Your Vote was Successful"
                                        : `You are about to Vote for ${newModal.result.name}`}
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur.
                                    Sodales tempor <br />
                                    montes ornare quam cum sociis quisque.
                                </p>
                                <button
                                    className="modal-election-btn"
                                    onClick={handleSuccess}
                                >
                                    {isVoted ? "Okay, Got it" : "Vote"}
                                </button>
                            </div>
                        ))}
                    </Modal>
                </div>
            ),
        },
    ]

    return (
        <div className="final-results-container">
            <div className="final-results-text-search">
                <h4>Presidential Election 2023</h4>
                <div className="search-input">
                    <AiOutlineSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search For Doctors"
                        className="search-input-tag"
                    />
                </div>
            </div>
            <p className="aspirants">{numCandidates} Aspirants</p>

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
