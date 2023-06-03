import React from "react";
import { Table, Modal } from "antd";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { useRef, useState } from "react";
import "./FinalResults.css";
import modalIcon from "../../images/modal-icon.png";
import { data } from "./data";
import { useNavigate } from "react-router-dom";
import {
  paginatedIndexesConfig,
  useContractInfiniteReads,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
} from "wagmi";
import { VOTE_CHAIN_ABI, VOTE_CHAIN_ADDRESS } from "../../..";

const FinalResults = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const [dataSet, setDataSet] = useState([]);
  const [numCandidates, setNumCandidates] = useState(0);
  const [candidateId, setCandidateId] = useState(0);
  const { address } = useAccount();
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const handleNavigate = () => {
    navigate("/welcome");
  };
  const v_StartTime = useContractRead({
    address: VOTE_CHAIN_ADDRESS,
    abi: VOTE_CHAIN_ABI,
    functionName: "s_votingStartTime",
  });

  const v_endTime = useContractRead({
    address: VOTE_CHAIN_ADDRESS,
    abi: VOTE_CHAIN_ABI,
    functionName: "s_votingEndTime",
  });
  const getTime = () => {
    const startTime = Number(v_StartTime.data);
    const unixTimestamp = v_StartTime.data;
    const s_date = new Date(`${unixTimestamp}` * 1000).getTime();
    const e_date = new Date(`${v_endTime.data}` * 1000).getTime();
    const now = new Date().getTime();
    const s_distance = s_date - now;
    const e_distance = e_date - now;

    const s_days = Math.floor(s_distance / (1000 * 60 * 60 * 24));
    const s_hours = Math.floor(
      (s_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const s_mins = Math.floor((s_distance % (1000 * 60 * 60)) / (1000 * 60));
    const s_secs = Math.floor((s_distance % (1000 * 60)) / 1000);

    const e_days = Math.floor(e_distance / (1000 * 60 * 60 * 24));
    const e_hours = Math.floor(
      (e_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const e_mins = Math.floor((e_distance % (1000 * 60 * 60)) / (1000 * 60));
    const e_secs = Math.floor((e_distance % (1000 * 60)) / 1000);

    if (s_distance < 0) {
      setStartTime(false);
    } else {
      setStartTime(true);
    }

    if (e_distance < 0) {
      setEndTime(false);
    } else {
      setEndTime(true);
    }
  };
  setInterval(() => {
    if (address) {
      getTime();
    }
  }, 1000);

  const readCandidateCount = useContractRead({
    address: VOTE_CHAIN_ADDRESS,
    abi: VOTE_CHAIN_ABI,
    functionName: "candidatesCount",
    onSuccess(data) {
      setNumCandidates(Number(data));
    },
  });

  const mlootContractConfig = {
    address: VOTE_CHAIN_ADDRESS,
    abi: VOTE_CHAIN_ABI,
  };

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
        ];
      },
      {
        start: 1,
        perPage: 3,
        direction: "increment",
      }
    ),
    onSuccess(data) {
      setDataSet(data.pages[0]);
    },
    cacheTime: 2_000,
  });

  const vote = usePrepareContractWrite({
    address: VOTE_CHAIN_ADDRESS,
    abi: VOTE_CHAIN_ABI,
    functionName: "castVote",
    args: [candidateId, address],
    onError(error) {
      // alert(error.message.Error)
      // navigate("/welcome")
    },
  });

  const { write, isLoading, isSuccess, isError } = useContractWrite(
    vote.config
  );

  const showModal = (record) => {
    setIsModalOpen(true);
    setModalContent([record]);
  };
  const handleSuccess = () => {
    setIsVoted(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsVoted(false);
  };
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
            onClick={() => {
              showModal(record);
              setCandidateId(record.result.id);
            }}
          >
            {isVoted ? "Voted" : "Vote"}
          </button>
          <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
            {modalContent.map((newModal) => (
              <div className="modal-container">
                <img src={modalIcon} alt="Modal Icon" className="modal-icon" />
                <h4 className="modal-election-name">
                  {isSuccess
                    ? "Your Vote was Successful"
                    : isError
                    ? "Something Went Wrong, you are unable to Vote"
                    : `You are about to Vote for ${newModal.result.name}`}
                </h4>
                <img
                  src={newModal.result.image}
                  alt="First Candidate"
                  className="newmodal-image"
                />
                <button
                  className={
                    !endTime || startTime
                      ? "modal-election-btn disabled"
                      : "modal-election-btn"
                  }
                  onClick={write}
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
  ];

  return (
    <div className="final-results-container">
      <AiOutlineArrowLeft
        className="arrow-left-final-results"
        onClick={handleNavigate}
      />
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
      <p className="aspirants">{numCandidates} Aspirants</p>

      <Table
        columns={columns}
        dataSource={dataSet}
        scroll={{
          x: 900,
        }}
      />
    </div>
  );
};

export default FinalResults;
