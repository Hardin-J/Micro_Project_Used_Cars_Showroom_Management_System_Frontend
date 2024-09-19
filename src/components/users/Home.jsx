import React from 'react'
import HeroSection from './Home/HeroSection'
import Feature from './Home/Feature'
import FeaturedCar from './Home/FeaturedCar'
import Stats from './Home/Stats'
import Testimonial from './Home/Testimonial'
import Footer from './Home/Footer'

function Home() {
    return (
        <div>
            <HeroSection />
            <Feature />
            <FeaturedCar />
            <Stats />
            <Testimonial />
            <Footer/>
        </div>
    )
}

export default Home
