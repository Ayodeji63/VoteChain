import { useState } from "react"
import "./styles.css"
import { bloctoSDK } from "./services/ethereum"
import BLTButton from "./component/Button"
export default function App() {
    const [address, setAddress] = useState(null)

    const loginHandler = async () => {
        const accounts = await bloctoSDK?.ethereum?.request({
            method: "eth_requestAccounts",
        })
        setAddress(accounts[0])
    }

    const logoutHandler = async () => {
        try {
            await bloctoSDK?.ethereum?.request({ method: "wallet_disconnect" })
            localStorage.removeItem("sdk.session")
            setAddress(null)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="App">
            {address ? (
                <>
                    <BLTButton onClick={logoutHandler}>Logout</BLTButton>
                    <p>address: {address}</p>
                </>
            ) : (
                <BLTButton onClick={loginHandler}>Login</BLTButton>
            )}
        </div>
    )
}
