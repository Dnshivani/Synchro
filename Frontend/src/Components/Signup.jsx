import React from 'react'
import { Link } from 'react-router-dom'
import Landing from './Landing'
import HeroSection from './HeroSection'
import Logo from './Logo'
import axios from 'axios'
import DashBoard from './DashBoard'

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
            <div className='max-w-lg card bg-base-100 w-96 shadow-sm bg-white ' >

                {success && <div className="alert alert-success shadow-lg animate-fade-in">
                    <span>{success}</span>
                </div>}
                {error && <div role="alert" className="alert alert-error shadow-lg animate-fade-in">
                    <span>{error}</span>
                </div>}

                <div className='text-xl border card-body p-8 '>
                    <div className='flex justify-center mb-6'> <Link to="/"> <Logo /> </Link> </div>

                    <div className="text-center mb-8">
                        <h2 className='text-2xl font-bold text-gray-800'>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
                        <p className='text-gray-600 mt-2'>{isSignup ? 'Start organizing your projects today' : 'Enter your credentials to access your workspaces'}</p>
                    </div>

                    <form method="POST" onSubmit={handleSubmit} >
                        {isSignup && (<div className='form-control'>
                            <label className='label label-text font-medium'> Full Name </label>
                            <input type="text" placeholder="Enter Your Name" name='name' value={details.name} onChange={handleChange}
                                className="input input-bordered  border-2 w-full validator"
                                pattern="[A-Za-z][A-Za-z0-9\_]*" minLength="3" maxLength="30" />
                            <p className="validator-hint text-xs text-gray-500">
                                Must be 3 to 30 characterss,containing only letters, numbers or underscore.
                            </p>
                        </div>)}

                        <div className='form-control'>
                            <label className='label label-text font-medium' >Enter email</label>
                            <input type="email" placeholder="mail@site.com" name='email' value={details.email} onChange={handleChange}
                                className="input input-bordered w-full border-2 validator" />
                        </div>
                        <div className="form-control">
                            <label className='label label-text font-medium' >Password</label>
                            <input type="password" placeholder="••••••••" minLength="8" name='password' value={details.password} onChange={handleChange}
                                className="input input-bordered border-2 w-full validator"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                            <p className="validator-hint text-xs text-gray-500">
                                Must be more than 8 characters, including one number, one lowercase letter, one uppercase letter
                            </p>
                        </div>
                        <div className="text-center mt-4">
                            <button className='btn btn-primary w-full mb-3 border-2 border-green-700 hover:border-green-800' type="submit" >
                                {isSignup ? 'Create Account ' : 'Login '}
                            </button>
                            <p className="text-green-600 hover:text-green-900 font-small hover:underline cursor-pointer"
                                onClick={() => { showError(""); showSuccess(""); changePage(!isSignup); modify({ "name": "", "email": "", "password": "" }); }}>
                                {isSignup ? 'Already have a account ? login ' : 'Dont have a account ? Signup'}
                            </p>
                        </div>
                    </form >
                </div>
            </div>


        </div>

    )
}

