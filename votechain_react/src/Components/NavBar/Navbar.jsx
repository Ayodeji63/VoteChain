import React, { useContext, useEffect } from "react"
import "./Navbar.css"
import { useNavigate } from "react-router-dom"
import voteLogo from "../../images/demo-logo.png"
import { SignIn } from "../ConnectButton/ConnectButton"
import { useState } from "react"
import { HookContext } from "../../context/hook"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
const Navbar = () => {
    const navigate = useNavigate()
    const { address } = useAccount()

    return (
        <header>
            <div className="navbar-container">
                <img src={voteLogo} alt="Vote Logo" />
                <ul className="nav-list">
                    <li>
                        <a href="/">Mission</a>
                    </li>
                    <li>
                        <a href="/">How To Vote</a>
                    </li>
                    <li>
                        <a href="/">FAQs</a>
                    </li>
                </ul>

                <SignIn showBalance={false} />
            </div>
        </header>
    )
}

export default Navbar
