import { ethers } from "ethers"
import { createInstance } from "./forwarder"
import { signMetaTxRequest } from "./signer"
import { VOTE_CHAIN_ADDRESS } from ".."

async function sendMetaTx(
    voteChain,
    provider,
    signer,
    id,
    firstName,
    secondName
) {
    console.log(
        `Sending register meta-tx to set name=${(id, firstName, secondName)}`
    )
    const url = process.env.NEXT_APP_WEBHOOK_URL
    if (!url) throw new Error(`Missing relayer url`)

    const forwarder = createInstance(provider)
    const from = await signer.getAddress()
    const data = voteChain.interface.encodeFunctionData("registerVoter", [
        id,
        firstName,
        secondName,
    ])
    const to = "0x817747c32Bc5b42789F7ea868e7BEd421760959A"

    // "0x5e852F2024Abc72bB6c52866B81d737E34f5cf45"
    // 0x5e852f2024abc72bb6c52866b81d737e34f5cf45
    const request = await signMetaTxRequest(signer.provider, forwarder, {
        to,
        from,
        data,
    })

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" },
    })
}

async function castVoteMetaTx(
    voteChain,
    provider,
    signer,
    candidateId,
    sender
) {
    console.log(`Casting vote for ${candidateId}`)

    const url = process.env.NEXT_APP_WEBHOOK_URL
    if (!url) throw new Error(`Missing relayer url`)

    const forwarder = createInstance(provider)
    const from = await signer.getAddress()

    const data = voteChain.interface.encodeFunctionData("castVote", [
        candidateId,
        sender,
    ])
    const to = VOTE_CHAIN_ADDRESS

    const request = await signMetaTxRequest(signer.provider, forwarder, {
        to,
        from,
        data,
    })

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" },
    })
}
export async function registerVoter(
    voteChain,
    provider,
    id,
    firstName,
    secondName
) {
    if (!id) throw new Error(`Id cannot be empty`)
    if (!firstName) throw new Error(`FirstName cannot be empty`)
    if (!secondName) throw new Error(`FirstName cannot be empty`)
    if (!window.ethereum) throw new Error(`User wallet not found`)

    await window.ethereum.enable()

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    const userNetwork = await userProvider.getNetwork()
    if (userNetwork.chainId !== 420)
        throw new Error(`Please switch to Goerli for signing`)
    const signer = userProvider.getSigner()
    const from = await signer.getAddress()
    const balance = await provider.getBalance(from)

    return sendMetaTx(voteChain, provider, signer, id, firstName, secondName)
}

export async function castVote(voteChain, provider, candidateId, sender) {
    if (!candidateId) throw new Error(`candidateId cannot be empty`)
    if (!sender) throw new Error(`sender cannot be empty`)
    if (!window.ethereum) throw new Error(`User wallet not found`)

    await window.ethereum.enable()

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    const userNetwork = await userProvider.getNetwork()
    if (userNetwork.chainId !== 420)
        throw new Error(`Please switch to Goerli for signing`)
    const signer = userProvider.getSigner()
    const from = await signer.getAddress()
    const balance = await provider.getBalance(from)
    const canSendTx = balance.gt(1e15)

    return castVoteMetaTx(voteChain, provider, signer, candidateId, sender)
}
