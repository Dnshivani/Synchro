import React from 'react'
import { Link } from 'react-router-dom'
import Landing from './Landing'
import HeroSection from './HeroSection'
import Logo from './Logo'

export default function Signup() {
    const [isSignup, changePage] = React.useState(true);
    const [details, modify] = React.useState({ "name": "", "email": "", "password": "" });
    const handleChange = (e) => {
        modify({ ...details, [e.target.name]: e.target.value })
        // console.log(details)
    };

    const clear = () => {
        modify({ "name": "", "email": "", "password": "" });
    };
    return (

        <div className=' mt-20 bg-custom-secondary' >
            <form className='flex flex-col gap-2 items-center justify-center' >
                <p className=''>{isSignup ? 'Signup' : 'Login'}</p>
                {isSignup && (<div className='gap-2'>
                    < label className='justify-center' > Enter name  </label >
                    <input className=' justify-center' name='name' value={details.name} onChange={handleChange} type='text' placeholder='Name' required /> </div>)}

                <div> <label className='justify-center' >Enter email</label>
                    <input className='justify-center' name='email' value={details.email} onChange={handleChange} type='email' placeholder='youremail@gmail.com' required /></div>
                <div> <label className='  justify-center ' >Enter password</label>
                    <input className='  justify-center ' name='password' value={details.password} onChange={handleChange} type='password' placeholder='........' required /></div>
                <button className='item justify-center btn ' onClick={() => { clear() }}>{isSignup ? 'Create Account' : 'Login'} </button>
                <button onClick={() => { changePage(!isSignup) }}>{isSignup ? 'Already have a account ?login ' : 'Dont have a account ? Signup'}</button>
            </form >

        </div >


    )
}
