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
                        Vote For <span>Change,</span>
                        <br />
                        Vote <span>Wisely</span>
                    </h3>

                    <SignIn showBalance={false} className="hero-page-btn" />
                </div>
                <div className="sub-text">
                    <p>
                        Powerful, self-serve product and growth
                        <br /> analytics to help you convert, engage, and <br />
                        retain more users. Trusted by over 4,000 <br />
                        startups.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeroPage
