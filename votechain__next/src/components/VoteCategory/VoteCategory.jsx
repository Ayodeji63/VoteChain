import React from "react"
// import { useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai"
import "./VoteCategory.css"
import Link from "next/link"

const VoteCategory = () => {
    // const navigate = useNavigate();
    const handleNavigate = () => {
        // navigate("/finalresults");
    }
    return (
        <div className="vote-category-container">
            <div className="vote-details">
                <h5>Vote</h5>
                <div className="vote-category-cards">
                    <Link href={"/results"}>
                        <div className="vote-category-card">
                            <h5>
                                Presidential elections{" "}
                                <AiOutlineRight className="vote-icon" />
                            </h5>
                        </div>
                    </Link>
                    <div className="vote-category-card">
                        <h5>
                            Senate election{" "}
                            <AiOutlineRight className="vote-icon" />
                        </h5>
                    </div>
                    <div className="vote-category-card">
                        <h5>
                            House of Representative{" "}
                            <AiOutlineRight className="vote-icon" />
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoteCategory
