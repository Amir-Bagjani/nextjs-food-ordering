import Image from "next/image"
import { useState } from "react"
import styles from "../styles/Slider.module.css"


const Slider = () => {
    const [slide,setSlide] = useState(0)

    const handleSlide = (option) => {
        if(option === `l`){
            setSlide(slide => slide === 0 ? 0 : slide - 1)
        }else {
            setSlide(slide => slide === 2 ? 2 : slide + 1)
        }
    }

    const images = [
        "/img/slider3.png",
        "/img/slider1.png",
        "/img/slider2.png",
    ]

    return (
        <div className={styles.container}>
            
            <div className={styles.arrowContainer} style={{left: 0}} onClick={()=>handleSlide(`l`)}>
                <Image src="/img/arrowl.png" alt="arrow" layout="fill" objectFit="contain"/>
            </div>

            <div className={styles.wrapper} style={{transform:`translateX(${-100*slide}vw)`}}>
                {images.map((img, i) => (
                    <div className={styles.imgContainer} key={i}>
                        <Image src={img} alt="slider" layout="fill" />
                    </div>
                ))}
            </div>

            <div className={styles.arrowContainer} style={{right: 0}} onClick={()=>handleSlide(`r`)}>
                <Image src="/img/arrowr.png" alt="arrow" layout="fill" objectFit="contain"/>
            </div>
            
        </div>
    )
}

export default Slider
