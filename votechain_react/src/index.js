import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { HookProvider } from "./context/hook"
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
import { particleWallet } from "@particle-network/rainbowkit-ext"
import { ParticleNetwork } from "@particle-network/auth"
import {
    argentWallet,
    coinbaseWallet,
    imTokenWallet,
    injectedWallet,
    ledgerWallet,
    metaMaskWallet,
    omniWallet,
    rabbyWallet,
    rainbowWallet,
    trustWallet,
    walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"

export const { chains, publicClient } = configureChains(
    [sepolia],
    [
        alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
        publicProvider(),
    ]
)

const { wallets } = getDefaultWallets({
    appName: "VoteChain",
    projectId: "1694a591eac2ab285be5adbbfff34913",
    chains,
})

const particle = new ParticleNetwork({
    appId: process.env.REACT_APP_APP_ID,
    clientKey: process.env.REACT_APP_CLIENT_KEY,
    projectId: process.env.REACT_APP_PROJECT_ID,
})

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [
            particleWallet({ chains, authType: "google" }),
            particleWallet({ chains, authType: "facebook" }),
            particleWallet({ chains, authType: "apple" }),
        ],
    },
    ...wallets,
])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <HookProvider>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider chains={chains}>
                    <App />
                </RainbowKitProvider>
            </WagmiConfig>
        </HookProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
