"use client"

import Faq from "@/components/Faq/Faq"
import Features from "@/components/Features/Features"
import HeroPage from "@/components/HeroPage/HeroPage"
import HowToVote from "@/components/HowToVote/HowToVote"
import Mission from "@/components/Mission/Mission"
import Navbar from "@/components/Navbar/Navbar"
import Newsletter from "@/components/Newsletter/Newsletter"
import SubHeroPage from "@/components/SubHeroPage/SubHeroPage"
import Image from "next/image"
import { useState } from "react"
// import Navbar from "../components/Navbar/Navbar"

export default function Home() {
    return (
        <main>
            <HeroPage />
            <SubHeroPage />
            <Features />
            <Mission />
            <HowToVote />
            <Faq />
            <Newsletter />
        </main>
    )
}
