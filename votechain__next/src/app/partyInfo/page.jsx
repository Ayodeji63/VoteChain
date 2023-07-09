"use client"
import React, { useRef } from "react"
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

const PartyInfo = () => {
    const progressCircle = useRef(null)
    const progressContent = useRef(null)
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty("--progress", 1 - progress)
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
    }
    return (
        <section className="lg:w-[50%] m-auto">
            <div>
                <h1 className="text-2xl mt-14 mb-7 font-bold">APC</h1>
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
                    <SwiperSlide>
                        <img
                            src={"/apcBanner2.jpg"}
                            className="w-full object-cover h-[30vh]"
                            alt="First Candidate"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={"/ApcCamp.jpg"}
                            className="w-full object-cover h-[30vh]"
                            alt="First Candidate"
                        />
                    </SwiperSlide>

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
                <div className="w-[30%] p-3 rounded-lg shadow-2xl h-[43vh] overflow-hidden">
                    <img
                        src={"/Bola_Tinubu_portrait.jpg"}
                        className="w-full h-[83%] object-cover"
                        alt="First Candidate"
                    />
                    <p className="font-semibold text-xl">Bola Ahmed Tinubu</p>
                    <p>President</p>
                </div>

                <div className="w-[30%] p-3 rounded-lg shadow-2xl h-[43vh] overflow-hidden">
                    <img
                        src={"/shettima.jpeg"}
                        className="w-full h-[83%] object-cover"
                        alt="First Candidate"
                    />
                    <p className="font-semibold text-xl">Kashim Shettima</p>
                    <p>Vice President</p>
                </div>
            </div>
            <div className="mt-12 mb-16">
                <h1 className="text-2xl mt-14 mb-7 font-bold">
                    Who Is Bola Ahmed Tinubu
                </h1>
                <p>
                    Asiwaju Bola Ahmed Tinubu is the president-elect of Nigeria
                    following the February 25, 2023 presidential election.
                    Tinubu is a native of Osun State. He came out of his
                    mother’s loins, Abibatu Mogaji, on 29th March 1952. As of
                    2022, he’s 70 years old. No information about his dad. But,
                    his mum was a trader who became the Iyaloja, of Lagos state.
                    She held the position till her death. Tinubu’s education is
                    one remarkable thing worth knowing. He started at St John’s
                    primary school at Aroloya Lagos and continued at children’s
                    home school in Ibadan, southwest Nigeria. Ahmed is also
                    known as “Jagaban”. He finished his secondary education
                    abroad and attended Richard J. Daley College in Chicago,
                    Illinois. He completed his education at the state university
                    of Chicago and graduated with a bachelor of science degree
                    in accountancy. As well as with several significant honours
                    in 1975.
                </p>

                <h1 className="text-2xl mt-14 mb-7 font-bold">
                    Political Career
                </h1>
                <p>
                    Fast forward to when he started gaining footing in the
                    Nigerian government. Ahmed Tinubu became a member of the
                    Social Democratic Party, SDP In 1992. As a result of his
                    devotion and passion for politics, he joined the people’s
                    front fraction. Shehu Musa Yar’Adua was the leader of the
                    faction. He went into exile after the 1993 Nigeria coup
                    d’etat which the defence minister, Sani Abacha, led on
                    November 17. Describing his exile journey, Tinubu had in an
                    interview said; “I disguised with a huge turban and
                    babanriga and escaped into Benin Republic on a motorbike. My
                    old Hausa friend gave the clothes to me. In fact, when I
                    appeared to Kudirat Abiola, she didn’t know that I was the
                    one! I gave her some information and some briefing. I left
                    at 1 a.m. While in Benin Republic, I was still coming to
                    Badagry to ferry people, organise and coordinate the
                    struggle with others on ground. We put a group together,
                    ferrying NADECO people across. It was a very challenging
                    time. I can’t forget people like Segun Maiyegun and other
                    young guys in the struggle. I would come from Benin to hold
                    meetings with them and sneak back.“ Coming back from exile
                    in 1998, he soon gained the limelight and became the
                    governor of Lagos state in May 1999. He’s known worldwide
                    for creating 37 LGAs in the state. He reigned as a governor
                    for eight good years! What’s more? Because of his hatred for
                    the PDP, he made several efforts to make sure the APC
                    candidates won the 2015 elections. This makes him earn lots
                    of respect from the northerners. Bola Tinubu is the
                    godfather of many prominent politicians in Lagos state.
                </p>

                <h1 className="text-2xl mt-14 mb-7 font-bold">
                    Net Worth & Controversies
                </h1>
                <p>
                    Bola Ahmad has made several achievements and amassed huge
                    wealth and affluence. He’s married to Senator Oluremi
                    Tinubu. Allah blessed their marriage with Abibat, Oluwaseyi,
                    and the deceased Jide Tinubu. Tinubu’s net worth is
                    uncertain.
                </p>
            </div>

            <div className="mt-12 mb-16">
                <h1 className="text-2xl mt-14 mb-7 font-bold">
                    Who Is Bola Kashim Shettima
                </h1>
                <p>
                    Kashim Shettima is a Nigerian politician who served as the
                    Governor of Borno State in Nigeria from 2011 to 2019. He is
                    a member of the All Progressives Congress (APC) party.
                    Shettima is known for his efforts in addressing the
                    challenges of insurgency and promoting the development of
                    Borno State, which has been significantly affected by the
                    Boko Haram insurgency. During his tenure, he implemented
                    various programs and initiatives to improve education,
                    healthcare, infrastructure, and security in the state.
                    Kashim Shettima has played a prominent role in Nigerian
                    politics, particularly in the northeastern region of the
                    country.
                </p>

                <h1 className="text-2xl mt-14 mb-7 font-bold">
                    Political Career
                </h1>
                <p>
                    Kashim Shettima is a Nigerian politician who had a notable
                    political career serving as the Governor of Borno State from
                    2011 to 2019. He belonged to the All Progressives Congress
                    (APC) party. Shettima's tenure as governor coincided with a
                    challenging period marked by the activities of the Boko
                    Haram insurgency in the northeastern region of Nigeria.
                    Despite the security crisis, he focused on addressing the
                    issues faced by Borno State. Shettima implemented
                    significant reforms in the education sector, prioritizing
                    the rebuilding of schools and providing quality education to
                    children affected by the insurgency. He also emphasized
                    infrastructure development, initiating projects such as road
                    construction, water supply schemes, housing projects, and
                    healthcare facilities to improve living conditions.
                    Additionally, he recognized the importance of agriculture in
                    promoting economic growth and reducing poverty. Shettima
                    supported farmers by providing resources, training, and
                    market access to boost food production and enhance farmers'
                    livelihoods. Throughout his political career, Kashim
                    Shettima has been acknowledged for his efforts in promoting
                    development, security, and the welfare of the people in
                    Borno State, particularly in the face of the Boko Haram
                    insurgency.
                </p>

                <h1 className="text-2xl mt-14 mb-7 font-bold">Achievements</h1>
                <p>
                    Kashim Shettima, during his tenure as the Governor of Borno
                    State in Nigeria, achieved several notable accomplishments.
                    Here are some of his achievements:
                    <ol>
                        <li className="my-5">
                            <span className="font-semibold">
                                Handling the Boko Haram Insurgency:
                            </span>{" "}
                            Shettima faced the significant challenge of
                            addressing the Boko Haram insurgency, which had a
                            devastating impact on Borno State. Under his
                            leadership, efforts were made to strengthen security
                            forces, improve intelligence gathering, and
                            collaborate with the federal government to combat
                            the insurgency. His administration worked towards
                            the reestablishment of peace, stability, and the
                            safe return of internally displaced persons (IDPs)
                            to their communities.
                        </li>
                        <li>
                            Education Reforms: Shettima implemented substantial
                            reforms in the education sector of Borno State. His
                            administration focused on rebuilding schools that
                            were destroyed by the insurgency and providing
                            quality education to children affected by the
                            crisis. Efforts were made to enhance infrastructure,
                            train and recruit qualified teachers, and improve
                            access to education for all children in the state.
                        </li>
                        <li>
                            nfrastructure Development: Shettima prioritized
                            infrastructure development to improve the living
                            conditions of the people in Borno State. Various
                            projects were initiated, including the construction
                            and rehabilitation of roads, bridges, hospitals, and
                            other public facilities. These infrastructure
                            projects aimed to enhance connectivity, provide
                            better healthcare services, and support economic
                            development in the state.
                        </li>
                        <li>
                            Agricultural Development: Recognizing the
                            significance of agriculture in promoting economic
                            growth and reducing poverty, Shettima's
                            administration implemented agricultural programs and
                            initiatives. These initiatives supported farmers by
                            providing them with resources, training, and access
                            to markets. The focus was on boosting food
                            production, increasing productivity, and improving
                            the livelihoods of farmers in Borno State.
                        </li>
                        <li>
                            Empowerment and Poverty Alleviation: Shettima's
                            government implemented various empowerment and
                            poverty alleviation programs to uplift the
                            socio-economic conditions of the people. These
                            programs aimed to provide skills training,
                            entrepreneurial support, and financial assistance to
                            individuals and groups, enabling them to start
                            businesses and generate income for themselves and
                            their communities.
                        </li>
                    </ol>
                </p>
            </div>
        </section>
    )
}

export default PartyInfo
