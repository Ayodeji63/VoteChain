import React, { useState } from "react"
import "./LiveResults.css"
import { AiOutlineArrowUp } from "react-icons/ai"
import { useContractRead } from "wagmi"
import { VOTE_CHAIN_ABI, VOTE_CHAIN_ADDRESS } from "@/index"

const LiveResults = () => {
    const [totalVote, setTotalVote] = useState(null)
    const readLive = useContractRead({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "getTotalVoteCount",
        onSuccess(data) {
            setTotalVote(Number(data))
            console.log(data)
        },
    })
    return (
        <div className="live-result-container">
            <div className="live-result-details">
                <h5>Live Results</h5>
                <div className="live-results-cards">
                    <div className="live-results-card">
                        <h5 className="live-result-type">
                            Presidential elections
                        </h5>
                        <span>Counted Votes</span>
                        <h5>{totalVote}</h5>
                        <p>
                            <span className="live-result-icon">
                                <AiOutlineArrowUp /> 60%{" "}
                            </span>
                            Labour Party
                        </p>
                        <div className="category-status live">
                            <span>Live</span>
                        </div>
                    </div>
                    <div className="live-results-card">
                        <div className="live-results-text-type">
                            <h5 className="live-result-type">
                                Senate elections
                            </h5>
                            <p>Anambra Centra</p>
                        </div>
                        <span>Counted Votes</span>
                        <h5>65,567</h5>
                        <p>
                            <span className="live-result-icon">
                                <AiOutlineArrowUp /> 45%{" "}
                            </span>
                            APGA
                        </p>
                        <div className="category-status not-live">
                            <span>Not Live</span>
                        </div>
                    </div>
                    <div className="live-results-card">
                        <div className="live-results-text-type">
                            <h5 className="live-result-type">House of Reps</h5>
                            <p>Idemmili North/South</p>
                        </div>
                        <span>Counted Votes</span>
                        <h5>35,890</h5>
                        <p>
                            <span className="live-result-icon">
                                <AiOutlineArrowUp /> 52%{" "}
                            </span>
                            Labour Party
                        </p>
                        <div className="category-status not-live">
                            <span>Not Live</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveResults
