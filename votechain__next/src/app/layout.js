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
import { goerli, optimismGoerli } from "wagmi/chains"
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

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
})

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
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

const particle = new ParticleNetwork({
    appId: "20ab8757-9a69-4b14-bd7c-9d06dd20d20e",
    clientKey: "cQYVfEkOtm8ttmj9Rg3dCuD9kgi0M84BYo9eYqvc",
    projectId: "b7d40265-7a93-4ff8-bc6e-bccb39228570",
})

const particleWallets =
    typeof window !== "undefined"
        ? [
              particleWallet({ chains, authType: "google" }),
              particleWallet({ chains, authType: "facebook" }),
              particleWallet({ chains, authType: "apple" }),
              particleWallet({ chains }),
          ]
        : []

const popularWallets = {
    groupName: "Popular",
    wallets: [
        ...particleWallets,
        injectedWallet({ chains }),
        rainbowWallet({ chains }),
        coinbaseWallet({ appName: "RainbowKit demo", chains }),
        metaMaskWallet({ chains }),
        walletConnectWallet({ chains }),
    ],
}

const connectors = connectorsForWallets([
    popularWallets,
    {
        groupName: "Other",
        wallets: [
            argentWallet({ chains }),
            trustWallet({ chains }),
            omniWallet({ chains }),
            imTokenWallet({ chains }),
            ledgerWallet({ chains }),
        ],
    },
])
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

    return (
        <html lang="en">
            <body className={poppins.className}>
                {mounted ? (
                    <WagmiConfig config={wagmiConfig}>
                        <RainbowKitProvider chains={chains}>
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
                ) : null}
            </body>
        </html>
    )
}