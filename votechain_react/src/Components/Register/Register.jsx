import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import "./Register.css"
import { Web3Button } from "@web3modal/react"
import axios from "axios"

import App from "../blocto_test/App"
import {
    usePrepareContractWrite,
    useContractWrite,
    useContractRead,
    useAccount,
} from "wagmi"
import { VOTE_CHAIN_ABI, VOTE_CHAIN_ADDRESS } from "../../.."
import {
    GelatoRelay,
    SponsoredCallERC2771Request,
} from "@gelatonetwork/relay-sdk"
import { ethers } from "ethers"
import { SmartAccount } from "@particle-network/biconomy"
import { particleWallet } from "@particle-network/rainbowkit-ext"

const Login = () => {
    const navigate = useNavigate()
    const { address } = useAccount()
    const [ninNumber, setNinNumber] = useState(0)
    const [timeLeft, setTimeLeft] = useState("")
    const relay = new GelatoRelay()
    const target = "0x96D851fd1C12Fadc5334eC711659a89b4011cbda"

    const { config, error } = usePrepareContractWrite({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "registerVoter",
        args: [ninNumber],
        onError(error) {
            if (error.message.includes("revert")) {
                // console.log();
                const errorMessage = error.message.replace("revert ", "")
                // console.error("Contract reverted with error:", errorMessage)
                const errorObj = JSON.stringify(
                    error.cause["metaMessages"][0],
                    null,
                    2
                )
                if (errorObj == "Error: VoteChain_voterRegistered()") {
                    console.log("Already Registered")
                    console.log(errorObj)
                }
            }
        },
    })
    const { write, isLoading, isIdle, isSuccess } = useContractWrite(config)

    const contractRead = useContractRead({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "getRegistrationDuration",
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
    const handleNavigate = () => {
        navigate("/welcome")
    }

    setInterval(() => {
        if (address) {
            getTime()
        }
    }, 1000)

    const sendMTx = async () => {
        try {
            if (!window.ethereum) throw new Error(`User wallet not found`)

            await window.ethereum.enable()
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const chainId = await provider
                .getNetwork()
                .then((network) => network.chainId)
            const signer = provider.getSigner()
            const address = await signer.getAddress()

            // relay request parameters
            const feeToken = "0x"
            const iface = new ethers.utils.Interface(VOTE_CHAIN_ABI)
            const allowListProof = [
                [ethers.constants.HashZero],
                ethers.constants.MaxUint256,
                0,
                feeToken,
            ]

            const data = iface.encodeFunctionData("registerVoter", [ninNumber])

            if (!chainId) return

            const sponsorAPIKey = "t52qhMIOpEbADYMQppRK3CFcAhFEoSlm3o4lJ0d_j_Q_"

            const request = {
                chainId: chainId,
                target: target,
                data: data,
                user: address,
            }

            const relayResponse = await relay.sponsoredCallERC2771(
                request,
                provider,
                sponsorAPIKey
            )
        } catch (e) {
            console.log(e)
        }
    }
    const sendGasless = async () => {
        try {
            // if (!window.ethereum) throw new Error("Metamask not found")
            // await window.ethereum.enable()
            // const provider = new ethers.providers.Web3Provider(window.ethereum)
            // const signer = provider.getSigner()
            // const address = await signer.getAddress()
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            const smartAccount = new SmartAccount(provider, {
                projectId: process.env.REACT_APP_PROJECT_ID,
                clientKey: process.env.REACT_APP_CLIENT_KEY,
                appId: process.env.REACT_APP_APP_ID,
                networkConfig: [
                    {
                        dappAPIKey: process.env.REACT_APP_BICONOMY_KEY,
                        chainId: 5,
                    },
                ],
            })

            // const ninBytes = ethers.utils.arrayify(ninNumber.toString())

            const tx = {
                to: target,
                value: "",
                data: ninNumber,
            }

            const txHash = await smartAccount.sendGaslessTransaction(tx)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <AiOutlineArrowLeft
                    className="arrow-left"
                    onClick={handleNavigate}
                />
                <h3>Register To Vote </h3>
                <p>
                    Enter your Voters Identification Number (VIN) or National{" "}
                    <br />
                    Identification Number(NIN)
                </p>
                {/* Days Hours Minutes and Seconds */}
                <h4>
                    Time Remaining for Registration <br />{" "}
                    <span className="span">{timeLeft}</span>{" "}
                </h4>
                {timeLeft === "00d : 00h : 00m : 00s" && (
                    <p>Registration Over</p>
                )}
                <input
                    type="number"
                    value={ninNumber}
                    onChange={(e) => setNinNumber(e.target.value)}
                    placeholder="Enter your VIN/NIN"
                    // className={!timeLeft ? "" : "disabled"}
                />
                {/* <input type="email" placeholder="Enter your Email Address" /> */}
                <button
                    onClick={write}
                    // className={!timeLeft ? "" : "disabled"}
                >
                    {isLoading
                        ? "Loading..."
                        : isSuccess
                        ? "Registered"
                        : "Register"}
                </button>
                <span>
                    {error === "VoteChain_voterRegistered()" &&
                        "Already Registered"}
                </span>
            </div>
        </div>
    )
}

export default Login
