import React from 'react'
import { Link } from 'react-router-dom'
import Landing from './Landing/Landing'
import HeroSection from './Landing/HeroSection'
import Logo from './Logo'
import axios from 'axios'
import DashBoard from './DashBoard/DashBoard'

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
        console.log(details);// will be commented or removed
    };

    const handleSubmit = async (e) => {
        e.preventDefault();// this is to stop the refresh of a form  
        setLoad(true);
        showError("");
        showSuccess("");
        try {
            if (isSignup) {
                const response = await axios.post("http://localhost:5000/user/register", details,
                    { headers: { "Content-Type": "application/json", }, });
                console.log(response.data); //will be commented or removed 
                showSuccess("Created account successfully.");
            } else {
                const response = await axios.post("http://localhost:5000/user/login", details,
                    { headers: { "Content-Type": "application/json", }, });
                console.log(response.data);//will be commented or removed 
                showSuccess("Verified successfully.");
            }
        } catch (e) {
            showError(e.response?.data?.message || "Something went wrong");
        } finally {
            <Link to="/dashboard"><DashBoard /></Link>
            setLoad(false);
            modify({ "name": "", "email": "", "password": "" });
        }
    };

    return (
        <div className="min-h-screen bg-base-100 from-blue-50 to-gray-100 flex items-center justify-center p-4">
            <div className='max-w-lg card  w-96 shadow-sm bg-base-300 ' >


                <div className='text-xl border-neutral card-body p-8'>
                    <div className='flex justify-center mb-6'> <Link to="/"> <Logo /> </Link> </div>

                    <div className="text-center mb-8">
                        <h2 className='text-2xl font-bold text-accent'>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
                        <p className='text-accent mt-2'>{isSignup ? 'Start organizing your projects today' : 'Enter your credentials to access your workspaces'}</p>
                    </div>

                    <form method="POST" onSubmit={handleSubmit} className=''  >
                        {isSignup && (<div className=''>
                            <label className='label label-text font-medium text-secondary-content'> Full Name </label>
                            <input type="text" placeholder="Enter Your Name" name='name' value={details.name} onChange={handleChange}
                                className="input input-bordered border-accent text-shadow-neutral-content  bg-base-200 border-2 w-full validator p-5"
                                pattern="[A-Za-z][A-Za-z0-9\_]*" minLength="3" maxLength="30" />
                            <p className="validator-hint text-xs text-info">
                                Must be 3 to 30 characterss,containing only letters, numbers or underscore.
                            </p>
                        </div>)}

                        <div className=''>
                            <label className='label label-text font-medium text-secondary-content' >Enter email</label>
                            <input type="email" placeholder="mail@site.com" name='email' value={details.email} onChange={handleChange}
                                className="input input-bordered border-accent text-shadow-neutral-content  bg-base-200 w-full border-2 validator p-5" />
                        </div>

                        <div className="">
                            <label className='label label-text font-medium  text-secondary-content' >Password</label>
                            <input type="password" placeholder="••••••••" minLength="8" name='password' value={details.password} onChange={handleChange}
                                className="input input-bordered border-accent text-shadow-neutral-content  bg-base-200 border-2 w-full validator p-5"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                            <p className="validator-hint text-xs text-info">
                                Must be more than 8 characters, including one number, one lowercase letter, one uppercase letter
                            </p>
                        </div>
                        <div className="text-center mt-4">

                            {success || error ? (<div> {success && <div className="alert alert-success shadow-lg animate-fade-in">
                                <span>{success}</span>
                            </div>}
                                {error && <div role="alert" className="alert alert-error shadow-lg animate-fade-in">
                                    <span>{error}</span>
                                </div>}
                            </div>) : (
                                <button className='btn btn-accent w-full mb-3 border-2 border-accent hover:border-accent-content' type="submit" >
                                    {isSignup ? 'Create Account ' : 'Login '}
                                </button>
                            )}
                            <p className=" font-small "
                                onClick={() => { showError(""); showSuccess(""); changePage(!isSignup); modify({ "name": "", "email": "", "password": "" }); }}>
                                {isSignup ? 'Already have a account ? ' : 'Dont have a account ? '}
                                <span className='text-accent-content-600 hover:text-accent  hover:underline cursor-pointer'>{isSignup ? 'Login' : 'Signup'}</span>
                            </p>
                        </div>
                    </form >
                </div>
            </div>


        </div>

    )
}

//login to another account  button
//logout option
//Login ey ledhu indhulo think by props