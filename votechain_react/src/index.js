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
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    bscTestnet,
    goerli,
    optimismGoerli,
    polygonMumbai,
} from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { bloctoWallet } from "@blocto/rainbowkit-connector"
export const { chains, publicClient } = configureChains(
    [sepolia, optimismGoerli],
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

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [
            bloctoWallet({ chains }), // add BloctoWallet
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
