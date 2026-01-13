import React from 'react'
import { Link } from 'react-router-dom'
import Landing from './Landing'
import HeroSection from './HeroSection'
import Logo from './Logo'
import axios from 'axios'

export default function Signup() {
    const [isSignup, changePage] = React.useState(true);
    const [details, modify] = React.useState({ "name": "", "email": "", "password": "" });
    const [isLoading, setLoad] = React.useState(false);
    const [error, showError] = React.useState("");
    const [success, showSuccess] = React.useState("");

    React.useEffect(() => {
        const timer = setTimeout(() => {
            showError("");
            showSuccess("");
        }, 3000);
        return () =>
            clearTimeout(timer);


    }, [success, error]);

    const handleChange = (e) => {
        modify({ ...details, [e.target.name]: e.target.value });
        console.log(details);
    };

    const fetch = async (e) => {
        e.preventDefault(); //basic ga going to some url signup?email=" "&password ala vellakunda stopping
        setLoad(true);
        try {
            if (isSignup) {
                const response = await axios.post("http://localhost:5000/user/register", details, {
                    headers: { "Content-Type": "application/json", },
                });
                console.log(response.data);
                if (response.data == 200) { showSuccess("Created account successfully."); }
                else {
                    showError("this name or email already exists.");
                }
            } else {
                const response = await axios.post("http://localhost:5000/user/login", details, {
                    headers: { "Content-Type": "application/json", },
                });
                console.log(response.data);

                if (response.data == 200) { showSuccess("Verified successfully."); }
                else {
                    showError("incorrect email or password. please check ");
                }

            }
        } catch (e) {
            console.error(e);
            showError(e);
        }
        finally {
            setLoad(false);
            modify({ "name": "", "email": "", "password": "" });
        }


    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
            <div className=' max-w-lg card bg-base-100 w-96 shadow-sm' >

                <form className='flex flex-col gap-2 items-center justify-center card-body' method="POST" onSubmit={fetch}   >
                    <div className='card-title'> <Link to="/">  <Logo /></Link></div>

                    <h2 className=''>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
                    <p className=''>{isSignup ? 'Start organizing your projects today' : 'Enter your credentials to access your workspaces'}</p>

                    {isSignup && (<div className='space-y-2'>
                        < label className='justify-center block text-sm font-medium text-gray-700' > Enter name  </label >
                        <input type="text" className="input input-bordered w-full validator focus:input-primary  " required placeholder="Username" name='name' value={details.name} onChange={handleChange}
                            pattern="[A-Za-z][A-Za-z0-9\_]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" />
                        <p className="validator-hint text-xs text-gray-500 mt-1">
                            Must be 3 to 30 characters
                            <br />containing only letters, numbers or underscore
                        </p>
                        {/* <input className=' justify-center' name='name' value={details.name} onChange={handleChange} type='text' placeholder='Name' required /> */}
                    </div>)}

                    <div className='space-y-1'> <label className='justify-center block text-sm font-medium text-gray-700' >Enter email</label>
                        <input className="input validator" type="email" required placeholder="mail@site.com" name='email' value={details.email} onChange={handleChange} />
                        {/* <input className='justify-center' name='email' value={details.email} onChange={handleChange} type='email' placeholder='youremail@gmail.com' required /> */}
                    </div>
                    <div> <label className='  justify-center ' >Enter password</label>
                        <input type="password" className="input validator" required placeholder="Password" minLength="8" name='password' value={details.password} onChange={handleChange}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                        <p className="validator-hint">
                            Must be more than 8 characters, including
                            <br />At least one number
                            <br />At least one lowercase letter
                            <br />At least one uppercase letter
                        </p>
                        {/* <input className='  justify-center ' name='password' value={details.password} onChange={handleChange} type='password' placeholder='........' required /> */}
                    </div>
                    <button className='item justify-center btn ' >{isSignup ? 'Create Account' : 'Login'} </button>
                    <button onClick={() => { changePage(!isSignup) }}>{isSignup ? 'Already have a account ? login ' : 'Dont have a account ? Signup'}</button>
                </form >
                {success && <div role="alert" className="alert alert-success alert-soft">
                    <span>{success}</span>
                </div>}
                {error && <div role="alert" className="alert alert-error alert-soft">
                    <span>Error! Task failed successfully.</span>
                </div>}
            </div>
        </div>
    )
}

