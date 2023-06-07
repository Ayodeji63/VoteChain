"use client"
import LiveResults from "@/components/LiveResults/LiveResults"
import VoteCategory from "@/components/VoteCategory/VoteCategory"
import Welcome from "@/components/Welcome/Welcome"
import React from "react"

const WelcomePage = () => {
    return (
        <div>
            <Welcome />
            <VoteCategory />
            <LiveResults />
        </div>
    )
}

export default WelcomePage
