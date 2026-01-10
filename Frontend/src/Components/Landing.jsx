import React from 'react'
import NavBar from './NavBar'
import HeroSection from './HeroSection'
import Footer from './Footer'
import HowItworks from './HowItworks'

export default function Landing() {
    return (
        <div className='bg-custom-secondary'>

            <NavBar />
            <HeroSection />
            <HowItworks />
            <Footer />
        </div>
    )
}
