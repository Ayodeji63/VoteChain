"use client"
import "./globals.css"
import { Inter } from "next/font/google"
import { Poppins } from "next/font/google"
import "@rainbow-me/rainbowkit/styles.css"
import {
    getDefaultWallets,
    RainbowKitProvider,
    connectorsForWallets,
} from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi"
import { fantomTestnet, goerli, optimismGoerli } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import Navbar from "@/components/Navbar/Navbar"
import { ToastContainer } from "react-toastify"
import { Toaster } from "react-hot-toast"
const inter = Inter({ subsets: ["latin"] })
import { particleWallet } from "@particle-network/rainbowkit-ext"
import { ParticleNetwork } from "@particle-network/auth"
import { useEffect, useState } from "react"
import {
    argentWallet,
    coinbaseWallet,
    imTokenWallet,
    injectedWallet,
    ledgerWallet,
    metaMaskWallet,
    omniWallet,
    rainbowWallet,
    trustWallet,
    walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"

import { EthereumContext } from "../eth/context"
import { createProvider } from "../eth/provider"
import { createInstance } from "../eth/registry"
import { createASBTInstance } from "../eth/ASBT"
import { createLSBTInstance } from "@/eth/LSBT"
import { createPSBTInstance } from "@/eth/PSBT"
import { Context } from "../eth/candidate"
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
})

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [optimismGoerli],
    [
        alchemyProvider({ apiKey: "PrdHvDC9SU7_y9GyCH3tG734SOMbwAkj" }),
        publicProvider(),
    ]
)

const { wallets } = getDefaultWallets({
    appName: "VoteChain",
    projectId: "1694a591eac2ab285be5adbbfff34913",
    chains,
})

const popularWallets = {
    groupName: "Recommended",
    wallets: [
        metaMaskWallet({ chains }),
        trustWallet({ chains }),
        injectedWallet({ chains }),
        rainbowWallet({ chains }),
        walletConnectWallet({ chains }),
    ],
}

const connectors = connectorsForWallets([popularWallets])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
})

export default function RootLayout({ children }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [mounted])

    const [candidateInfo, setCandidateInfo] = useState([])

    const provider = createProvider()
    const registry = createInstance(provider)
    const asbt = createASBTInstance(provider)
    const lsbt = createLSBTInstance(provider)
    const psbt = createPSBTInstance(provider)
    const ethereumContext = { provider, registry, asbt, lsbt, psbt }

    return (
        <html lang="en">
            <body className={poppins.className}>
                {mounted ? (
                    <EthereumContext.Provider value={ethereumContext}>
                        <Context.Provider
                            value={{ candidateInfo, setCandidateInfo }}
                        >
                            <WagmiConfig config={wagmiConfig}>
                                <RainbowKitProvider
                                    chains={chains}
                                    modalSize="compact"
                                >
                                    <Navbar />
                                    {children}
                                    <Toaster
                                        position="top-center"
                                        reverseOrder={false}
                                        gutter={8}
                                        containerClassName=""
                                        containerStyle={{}}
                                        toastOptions={{
                                            // Define default options
                                            className: "",
                                            duration: 5000,
                                            style: {
                                                background: "#363636",
                                                color: "#fff",
                                            },

                                            // Default options for specific types
                                            success: {
                                                duration: 3000,
                                                theme: {
                                                    primary: "green",
                                                    secondary: "black",
                                                },
                                            },
                                        }}
                                    />
                                </RainbowKitProvider>
                            </WagmiConfig>
                        </Context.Provider>
                    </EthereumContext.Provider>
                ) : null}
            </body>
        </html>
    )
}
