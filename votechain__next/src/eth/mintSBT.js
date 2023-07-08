import { ethers } from "ethers"
import { createInstance } from "./forwarder"
import { signMetaTxRequest } from "./signer"

async function mintToken(token, tokenAddress, provider, signer, sender) {
    console.log(`Minting Nft ro ${sender}`)

    const url = process.env.NEXT_APP_WEBHOOK_URL
    if (!url) throw new Error(`Missing relayer url`)

    const forwarder = createInstance(provider)
    const from = await signer.getAddress()

    const data = token.interface.encodeFunctionData("_mint", [sender])

    const to = tokenAddress

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

export async function _mintToken(token, tokenAddress, provider, sender) {
    if (!sender) throw new Error(`sender cannot be empty`)
    if (!window.ethereum) throw new Error(`User wallet not found`)

    await window.ethereum.enable()

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    const userNetwork = await userProvider.getNetwork()
    if (userNetwork.chainId !== 420)
        throw new Error(`Please switch to Goerli for signing`)
    const signer = userProvider.getSigner()
    const from = await signer.getAddress()
    return mintToken(token, tokenAddress, provider, signer, sender)
}
