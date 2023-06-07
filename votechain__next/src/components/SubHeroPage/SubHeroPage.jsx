import React from "react"
import "./SubHeroPage.css"
import Image from "next/image"

const SubHeroPage = () => {
    return (
        <div className="super-hero-container">
            <div className="super-hero-images">
                <div>
                    <Image
                        src={"./images/sub-hero-image1.png"}
                        width={100}
                        height={100}
                        alt=""
                    />
                </div>
                <div>
                    <Image
                        src={"./images/sub-hero-image2.png"}
                        width={100}
                        height={100}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default SubHeroPage
