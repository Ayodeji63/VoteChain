import React, { useContext, useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Modal } from "antd"
import "./Register.css"

import {
    usePrepareContractWrite,
    useContractWrite,
    useContractRead,
    useAccount,
    useContractEvent,
} from "wagmi"
import { VOTE_CHAIN_ABI, VOTE_CHAIN_ADDRESS } from "@/index"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { EthereumContext } from "@/eth/context"
import { registerVoter } from "@/eth/register"
import { useRouter } from "next/navigation"
import { ClipLoader } from "react-spinners"

const Login = () => {
    // const navigate = useNavigate()
    const router = useRouter()
    const { address } = useAccount()
    const [ninNumber, setNinNumber] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setsecondName] = useState("")
    const [timeLeft, setTimeLeft] = useState("")
    const [voters_count, setVoters_count] = useState(null)
    const [loading, setLoading] = useState(false)
    const [txText, setTxText] = useState("")
    const [txAnimation, setTxAnimation] = useState(false)
    const [errorAnimation, seterrorAnimation] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const unwatch = useContractEvent({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        eventName: "VoterRegistered",
        listener(log) {
            console.log(log)
            setLoading(false)
            // toast("Voter Registered", { type: "info" })
            setTxAnimation(true)
            setTxText("Your Are Registerd!")
        },
    })
    const { registry, provider } = useContext(EthereumContext)

    const sendTx = async () => {
        try {
            setLoading(true)
            setTxText("Sign Transaction In Your Wallet")
            const response = await registerVoter(
                registry,
                provider,
                ninNumber,
                firstName,
                secondName
            )
            const hash = response.hash
            // const onClick = hash ? () => window.open
            // toast("Transaction sent!", { type: "info" })
            setTxText("Registering Your Name...")
        } catch (err) {
            // toast(err.message || err, { type: "error" })
            setLoading(false)
            seterrorAnimation(true)
            setTxText("An error Occured")
            console.log(err)
        }
    }

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

    const showModal = async () => {
        setIsModalOpen(true)
        await sendTx()
        setLoading(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        seterrorAnimation(false)
        setTimeLeft("")
        setTxAnimation(false)
    }
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
                        onClick={showModal}
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

            <div>
                <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <div className="modal-container">
                        <img
                            src={"/images/modal-icon.png"}
                            alt="Modal Icon"
                            className="modal-icon"
                        />
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
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Login
