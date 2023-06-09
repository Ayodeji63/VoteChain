import React, { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"

import "./Register.css"

import {
    usePrepareContractWrite,
    useContractWrite,
    useContractRead,
    useAccount,
} from "wagmi"
import { VOTE_CHAIN_ABI, VOTE_CHAIN_ADDRESS } from "@/index"
import Link from "next/link"
import { toast } from "react-hot-toast"

const Login = () => {
    // const navigate = useNavigate()
    const { address } = useAccount()
    const [ninNumber, setNinNumber] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setsecondName] = useState("")
    const [timeLeft, setTimeLeft] = useState("")
    const [voters_count, setVoters_count] = useState(null)

    const { config, error } = usePrepareContractWrite({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "registerVoter",
        args: [ninNumber, firstName, secondName],
    })
    const { write, isLoading, isIdle, isSuccess } = useContractWrite(config)

    const contractRead = useContractRead({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "getRegistrationDuration",
    })

    const votersCount = useContractRead({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        address: "s_votersCount",
        onSuccess(data) {
            setVoters_count(data)
        },
        onError(er) {
            console.log(er)
        },
    })
    const getTime = () => {
        const endTime = Number(contractRead.data)
        const unixTimestamp = contractRead.data
        const date = new Date(`${unixTimestamp}` * 1000).getTime()
        const now = new Date().getTime()
        const distance = date - now

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        if (distance < 0) {
            setTimeLeft("00d : 00h : 00m : 00s")
        } else {
            setTimeLeft(
                `${days < 10 ? `${"0" + days} d` : `${days} d`} : ${
                    hours < 10 ? `${"0" + hours} h` : `${hours} h`
                } : ${minutes < 10 ? `${"0" + minutes} m` : `${minutes} m`} : ${
                    seconds < 10 ? `${"0" + seconds} s` : `${seconds} s`
                }`
            )
        }
    }

    setInterval(() => {
        if (address) {
            getTime()
        }
    }, 1000)

    useEffect(() => {
        isSuccess &&
            toast("Registration Successful", {
                duration: 5000,
                position: "top-center",

                // Styling
                style: {
                    background: "#009444",
                    WebkitAppearance: "none !important",
                },
                className: "",

                // Custom Icon
                icon: "👏",

                // Change colors of success/error/loading icon
                iconTheme: {
                    primary: "#009444",
                    secondary: "#fff",
                },

                // Aria
                ariaProps: {
                    role: "status",
                    "aria-live": "polite",
                },
            })
    }, [isSuccess])

    useEffect(() => {
        isLoading && toast("Loading...")
    }, [isLoading])
    return (
        <div className="login-container">
            <div className="div">
                <div className="login-form">
                    <Link href={"/welcome"}>
                        <AiOutlineArrowLeft
                            className="arrow-left"
                            // onClick={handleNavigate}
                        />
                    </Link>
                    <h3>Register To Vote </h3>
                    <p>
                        Enter your Voters Identification Number (VIN) or
                        National <br />
                        Identification Number(NIN)
                    </p>
                    {/* Days Hours Minutes and Seconds */}
                    <h4>
                        Time Remaining for Registration <br />{" "}
                        <span className="span">{timeLeft || ""}</span>{" "}
                    </h4>
                    {timeLeft === "00d : 00h : 00m : 00s" && (
                        <p>Registration Over</p>
                    )}
                </div>

                <div className="form-container">
                    <h1>Enter Your Details As Stated In Your Card</h1>
                    <input
                        type="name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first Name"
                    />
                    <input
                        type="name"
                        value={secondName}
                        onChange={(e) => setsecondName(e.target.value)}
                        placeholder="Enter your second Name"
                    />
                    <input
                        type="text"
                        value={ninNumber}
                        onChange={(e) => setNinNumber(e.target.value)}
                        placeholder="Enter your VIN/NIN"
                        className={
                            !timeLeft === "00d : 00h : 00m : 00s"
                                ? "disabled"
                                : ""
                        }
                    />

                    <button
                        onClick={write}
                        disabled={!firstName || !secondName || !ninNumber}
                        className={
                            timeLeft === "00d : 00h : 00m : 00s"
                                ? "disabled"
                                : ""
                        }
                    >
                        {isLoading
                            ? "Loading..."
                            : isSuccess
                            ? "Registered"
                            : "Register"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
