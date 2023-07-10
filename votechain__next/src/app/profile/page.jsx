"use client"

import {
    ASBT_ABI,
    ASBT_ADDRESS,
    LSBT_ABI,
    LSBT_ADDRESS,
    PSBT_ABI,
    PSBT_ADDRESS,
    VOTE_CHAIN_ABI,
    VOTE_CHAIN_ADDRESS,
} from "@/index"
import { Contract, ethers, providers } from "ethers"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    BeakerIcon,
} from "@heroicons/react/24/solid"

import { useAccount, useContractRead } from "wagmi"
const page = () => {
    const router = useRouter()
    const [voterData, setVoterData] = useState(null)
    const [Badges, setBadges] = useState("")
    const { address } = useAccount()
    let userProvider
    if (address) {
        userProvider = new providers.Web3Provider(window.ethereum)
    }
    const nameRead = useContractRead({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "getVoter",
        args: [address],
        onSuccess(data) {
            setVoterData(data)
        },
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

    console.log(supplyA.data)

    const getOwner = async (address, abi, provider, id) => {
        try {
            const contract = new Contract(address, abi, userProvider)
            const tx = await contract.ownerOf(id)
            return tx
        } catch (e) {
            console.log(e)
        }
    }

    async function getTokensUri(contractAddress, abi) {
        try {
            const signer = userProvider.getSigner()
            const contract = new Contract(contractAddress, abi, userProvider)

            const tx = await contract._uri()

            return tx
        } catch (e) {
            console.log(e)
        }
    }
    async function logJSONData(uri) {
        const response = await fetch(uri)
        const jsonData = await response.json()
        console.log(jsonData)
        return jsonData
    }
    const arrL = async () => {
        const arr = []
        for (let i = 1; i <= Number(supplyL.data); i++) {
            const contract = new Contract(LSBT_ADDRESS, LSBT_ABI, userProvider)
            const owner = await contract.ownerOf(i)
            if (owner == address) {
                const uri = await getTokensUri(LSBT_ADDRESS, ASBT_ABI)
                const data = await logJSONData(uri)
                const token = { tokenId: i, data }
                arr.push(token)
            }
        }
        for (let i = 1; i <= Number(supplyP.data); i++) {
            const contract = new Contract(PSBT_ADDRESS, PSBT_ABI, userProvider)
            const owner = await contract.ownerOf(i)
            if (owner == address) {
                const uri = await getTokensUri(PSBT_ADDRESS, PSBT_ABI)
                const data = await logJSONData(uri)
                const token = { tokenId: i, data }
                arr.push(token)
            }
        }
        for (let i = 1; i <= Number(supplyA.data); i++) {
            const contract = new Contract(ASBT_ADDRESS, ASBT_ABI, userProvider)
            const owner = await contract.ownerOf(i)
            if (owner == address) {
                const uri = await getTokensUri(ASBT_ADDRESS, ASBT_ABI)
                const data = await logJSONData(uri)
                const token = { tokenId: i, data }
                arr.push(token)
            }
        }
        console.log(arr)
        setBadges(arr)
    }

    useEffect(() => {
        arrL()
    }, [address])

    return (
        <section className="lg:w-[50%] sm:p-8 m-auto">
            <div
                onClick={() => router.back()}
                className="flex bg-green-700 w-fit p-1 font-medium rounded-xl text-white items-center cursor-pointer"
            >
                <ArrowLeftIcon className="h-6 w-6" />
                <p>back</p>
            </div>

            <div className="w-full justify-center flex items-center mt-12">
                <img src="/noImage.png" />
            </div>
            <div>
                <div className="flex justify-between w-full items-center">
                    <div>
                        <h1 className="text-xl mt-14 mb-2 font-semibold">
                            First Name:
                        </h1>
                        <p>{voterData?.firstName || ""}</p>
                    </div>

                    <div>
                        <h1 className="text-xl mt-14 mb-2 font-semibold">
                            Second Name:
                        </h1>
                        <p>{voterData?.SecondName || ""}</p>
                    </div>
                </div>

                <h1 className="text-xl mt-14 font-semibold">NIN Number:</h1>
                <p>{Number(voterData?.id) || ""}</p>

                <h1 className="text-xl mt-14 font-semibold mb-4">Badges:</h1>
                {Badges.length > 0 && (
                    <div className="w-[30%] sm:w-[40%]   p-3 rounded-lg shadow-2xl h-[45vh] overflow-hidden">
                        <img
                            src={Badges[0]?.data?.image}
                            className="w-full h-[83%] object-cover"
                            alt="Badges"
                        />
                        <p className="font-semibold text-xl">
                            #{Badges[0]?.tokenId}
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default page
