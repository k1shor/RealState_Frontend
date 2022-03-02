import React from 'react'
import Slider from "react-slick";
import './trending.css'


const Trending = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        autoplay: true,
        autoplayspeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <>
            <div className=".container-fluid mt-2 mb-2 shadow-lg">
                <Slider {...settings}>
                    <div>
                        <img src="./images/img1.jpg" className="img-fluid slick-img" alt=''/>
                    </div>
                    <div>
                        <img src="./images/img2.jpg" className="img-fluid slick-img" alt=''/>
                    </div>
                    <div>
                        <img src="./images/img3.jpg" className="img-fluid slick-img" alt=''/>
                    </div>
                    <div>
                        <img src="./images/item4.jpg" className="img-fluid slick-img" alt=''/>
                    </div>
                    <div>
                        <img src="./images/item5.jpg" className="img-fluid slick-img" alt=''/>
                    </div>
                    <div>
                        <img src="./images/item6.jpg" className="img-fluid slick-img" alt=''/>
                    </div>
                    <div>
                        <img src="./images/img1.jpg" className="img-fluid slick-img" alt=''/>
                    </div>
                    <div>
                        <img src="./images/img2.jpg" className="img-fluid slick-img" alt=''/>
                    </div>
                </Slider>
            </div>

        </>
    )
}

export default Trending
