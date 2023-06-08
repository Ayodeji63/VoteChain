import React, { useEffect } from "react"
import "./HeroPage.css"
import { SignIn } from "../ConnectButton/ConnectButton"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
const HeroPage = () => {
    // const navigate = useNavigate()
    const { address } = useAccount()
    const router = useRouter()

    useEffect(() => {
        address ? router.push("/welcome") : router.push("/")
    }, [address])

    return (
        <div className="heropage-container">
            <div className="heropage-texts">
                <div className="main-text">
                    <h3>
                        Vote For <span>Transparency,</span>
                        <br />
                        Vote <span>Decentralization</span>
                    </h3>

                    <SignIn showBalance={false} className="hero-page-btn" />
                </div>
                <div className="sub-text">
                    <p>
                     Say goodbye to centralized system of voting, unsecured and stressful voting system that leads to a lot of controversies and illegal appointments. Votechain is a decentralized voting system, secured and transparent on the blockchain.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeroPage
