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
// import { particleWallet } from "@particle-network/rainbowkit-ext"
// import { ParticleNetwork } from "@particle-network/auth"
import Navbar from "@/components/Navbar/Navbar"
const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
})

const { chains, publicClient } = configureChains(
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

// const particle = new ParticleNetwork({
//     appId: "20ab8757-9a69-4b14-bd7c-9d06dd20d20e",
//     clientKey: "cQYVfEkOtm8ttmj9Rg3dCuD9kgi0M84BYo9eYqvc",
//     projectId: "b7d40265-7a93-4ff8-bc6e-bccb39228570",
// })

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [
            // particleWallet({ chains, authType: "google" }),
            // particleWallet({ chains, authType: "linkedin" }),
            // particleWallet({ chains, authType: "facebook" }),
            // particleWallet({ chains, authType: "apple" }),
            // particleWallet({ chains, authType: "twitter" }),
        ],
    },
    ...wallets,
])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
})

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                {" "}
                <WagmiConfig config={wagmiConfig}>
                    <RainbowKitProvider chains={chains}>
                        <Navbar />
                        {children}
                    </RainbowKitProvider>
                </WagmiConfig>
            </body>
        </html>
    )
}
