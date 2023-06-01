import { createContext, useState, useEffect } from "react"
import { bloctoSDK } from "../Components/blocto_test/services/ethereum"
import { useNavigate } from "react-router-dom"

export const HookContext = createContext([])

HookContext.displayName = "HookContext"

export const HookProvider = ({ children }) => {
    const [address, setAddress] = useState(null)
    // const loginHandler = async () => {
    //     const accounts = await bloctoSDK?.ethereum?.request({
    //         method: "eth_requestAccounts",
    //     })
    //     setAddress(accounts[0])
    // }

    // const logoutHandler = async () => {
    //     try {
    //         await bloctoSDK?.ethereum?.request({ method: "wallet_disconnect" })
    //         localStorage.removeItem("sdk.session")
    //         setAddress(null)
    //         // navigate("/")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    return <HookContext.Provider value={{}}>{children}</HookContext.Provider>
}
