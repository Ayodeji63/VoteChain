"use client"
import React, { useContext, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper/modules"
import "swiper/css"
import "./page.css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { Context } from "@/eth/candidate"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useRouter } from "next/navigation"

const PartyInfo = () => {
    const progressCircle = useRef(null)
    const progressContent = useRef(null)
    const router = useRouter()
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty("--progress", 1 - progress)
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
    }

    const { candidateInfo, setCandidateInfo } = useContext(Context)
    console.log(candidateInfo)
    return (
        <section className="lg:w-[50%] sm:p-8 m-auto">
            <div
                onClick={() => router.back()}
                className="flex bg-green-700 w-fit p-1 font-medium rounded-xl text-white items-center cursor-pointer"
            >
                <AiOutlineArrowLeft
                    className="arrow-left"
                    // onClick={handleNavigate}
                />
                <p>back</p>
            </div>
            <div className="flex items-center mt-9 overflow-hidden justify-center w-fit">
                <div>
                    <img
                        src={candidateInfo.jsonData.partyImage}
                        className="h-16 mr-2"
                        alt=""
                    />
                </div>
                <h1 className="text-2xl mt-14 mb-7 font-bold">
                    {candidateInfo.party} Party
                </h1>
            </div>
            <div className="w-full mt-12">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="mySwiper heropage-slider"
                >
                    {candidateInfo.jsonData.campaingPics.map((info) => {
                        return (
                            <SwiperSlide>
                                <img
                                    src={info}
                                    className="w-full object-cover h-[40vh]"
                                    alt="First Candidate"
                                />
                            </SwiperSlide>
                        )
                    })}

                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
            </div>
            <h1 className="text-2xl mt-14 mb-7 font-bold">Candidates</h1>

            <div className="w-full flex justify-around ">
                <div className="w-[30%] sm:w-[40%] p-3 rounded-lg shadow-2xl h-[45vh] overflow-hidden">
                    <img
                        src={candidateInfo.jsonData.Pimage}
                        className="w-full h-[83%] object-cover"
                        alt="First Candidate"
                    />
                    <p className="font-semibold text-xl">
                        {candidateInfo.jsonData.President}
                    </p>
                    <p>President</p>
                </div>

                <div className="w-[30%] sm:w-[40%]  p-3 rounded-lg shadow-2xl h-[45vh] overflow-hidden">
                    <img
                        src={candidateInfo.jsonData.VpImage}
                        className="w-full h-[83%] object-cover"
                        alt="First Candidate"
                    />
                    <p className="font-semibold text-xl">
                        {candidateInfo.jsonData["Vice President"]}
                    </p>
                    <p>Vice President</p>
                </div>
            </div>
            <div className="mt-12 mb-16">
                <h1 className="text-2xl mt-14 mb-7 font-bold">
                    Who Is {candidateInfo.name}
                </h1>
                <p>{candidateInfo.jsonData.AboutP}</p>
            </div>

            <div className="mt-12 mb-16">
                <h1 className="text-2xl mt-14 mb-7 font-bold">
                    Who Is {candidateInfo.jsonData["Vice President"]}
                </h1>
                <p>{candidateInfo.jsonData.AboutVP}</p>
            </div>
        </section>
    )
}

export default PartyInfo
