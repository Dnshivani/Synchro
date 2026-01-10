import React from 'react'
import NavBar from './NavBar'
import HeroSection from './HeroSection'
import Footer from './Footer'
import HowItworks from './HowItworks'

export default function Landing() {
    return (
        <div >
            {/* <h1 className='text-center'>Daisy working</h1> */}
            <NavBar />
            <HeroSection />
            <HowItworks />
            <Footer />
        </div>
    )
}
