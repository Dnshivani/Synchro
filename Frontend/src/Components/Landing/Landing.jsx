import React from 'react'
import NavBar from '../NavBar.jsx'
import HeroSection from './HeroSection'
import Footer from './Footer'
import HowItworks from './HowItworks'

export default function Landing() {
    return (
        <div >
            {/* <h1 className='text-center'>Daisy working</h1> */}
            <NavBar />
            <div className=' flex justify-center'>
                <HeroSection />
            </div>
            <HowItworks />
            {/* <Footer /> */}
        </div>
    )
}
