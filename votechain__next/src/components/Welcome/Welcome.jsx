import React, { useEffect, useState } from "react"
import "./Welcome.css"
import { useAccount, useContractRead } from "wagmi"
import { VOTE_CHAIN_ABI, VOTE_CHAIN_ADDRESS } from "@/index"
import Link from "next/link"

const Welcome = () => {
    const { address } = useAccount()
    // const navigate = useNavigate();
    // const handleNavigate = () => {
    //   navigate("/register");
    // };
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
            setStartTime("00d : 00h : 00m : 00s")
        } else {
            setStartTime(
                `${s_days < 10 ? `${"0" + s_days} d` : `${s_days} d`} : ${
                    s_hours < 10 ? `${"0" + s_hours} h` : `${s_hours} h`
                } : ${s_mins < 10 ? `${"0" + s_mins} m` : `${s_mins} m`} : ${
                    s_secs < 10 ? `${"0" + s_secs} s` : `${s_secs} s`
                }`
            )
        }

        if (e_distance < 0) {
            setEndTime("00d : 00h : 00m : 00s")
        } else {
            setEndTime(
                `${e_days < 10 ? `${"0" + e_days} d` : `${e_days} d`} : ${
                    e_hours < 10 ? `${"0" + e_hours} h` : `${e_hours} h`
                } : ${e_mins < 10 ? `${"0" + e_mins} m` : `${e_mins} m`} : ${
                    e_secs < 10 ? `${"0" + e_secs} s` : `${e_secs} s`
                }`
            )
        }
    }

    useEffect(() => {
        if (!address) {
            // navigate("/")
        }
    }, [address])
    setInterval(() => {
        if (address) {
            getTime()
        }
    }, 1000)

    return (
        <div className="welcome-container">
            <div className="welcome-user-details">
                <h4 className="welcome-address">Welcome, {address}</h4>
                <div className="user-pooling-details">
                    {/* <p>
                        <strong>Polling Unit:</strong>{" "}
                        <span>Central School, Alor</span>
                    </p>
                    <p>
                        <strong>Polling Unit No:</strong> <span>026</span>
                    </p> */}
                    <p>
                        <strong>
                            Register To Vote:{" "}
                            <Link href={"/register"} className="register-text">
                                click here
                            </Link>
                        </strong>
                    </p>
                </div>
            </div>
            <div className="election-container">
                <div className="election-details">
                    <div className="election-text">
                        <h4>
                            Presidential, Senate And House of
                            <br />
                            Representative Election
                        </h4>
                        <span>
                            Enter your Voters Identification Number (VIN) or
                            National <br /> Identification Number (NIN)
                        </span>
                    </div>
                    <div className="election-time">
                        {startTime !== "00d : 00h : 00m : 00s" ? (
                            <div>
                                <p>Voting Starts In:</p>
                                <h5>{startTime}</h5>
                            </div>
                        ) : endTime !== "00d : 00h : 00m : 00s" ? (
                            <div>
                                <p>Voting Ends In:</p>
                                <h5>{endTime}</h5>
                            </div>
                        ) : (
                            <p>Voting Ended</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
