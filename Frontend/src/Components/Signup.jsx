import React from 'react'
import { Link } from 'react-router-dom'
import Landing from './Landing'
import HeroSection from './HeroSection'
import Logo from './Logo'

export default function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-accent/10 p-4">
            <form className="
    card 
    bg-base-100 
    w-full max-w-md 
    shadow-2xl 
    border border-base-300/50
    hover:shadow-3xl 
    transition-shadow
  ">
                {/* Header */}
                <div className="card-body">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                            <span className="text-3xl text-primary">🔐</span>
                        </div>
                        <h2 className="text-3xl font-bold">Welcome Back</h2>
                        <p className="text-base-content/60 mt-2">
                            Sign in to your Synchro account
                        </p>
                    </div>

                    {/* Email Field */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text font-semibold">Email Address</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40">
                                ✉️
                            </span>
                            <input
                                type="email"
                                className="
              input input-bordered 
              w-full pl-12 
              focus:border-primary 
              focus:ring-2 focus:ring-primary/20
              transition-all
            "
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="form-control mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="label-text font-semibold">Password</label>
                            <a href="#" className="link link-primary text-sm">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40">
                                🔒
                            </span>
                            <input
                                type="password"
                                className="
              input input-bordered 
              w-full pl-12 
              focus:border-primary 
              focus:ring-2 focus:ring-primary/20
              transition-all
            "
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="form-control mb-8">
                        <label className="label cursor-pointer justify-start gap-3">
                            <input type="checkbox" className="checkbox checkbox-primary" />
                            <span className="label-text">Remember me for 30 days</span>
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-4">
                        <button
                            type="submit"
                            className="
            btn btn-primary 
            w-full 
            text-lg 
            h-14
            hover:btn-primary/90
            transition-all
          "
                        >
                            Sign In
                        </button>

                        <div className="divider text-base-content/40">or continue with</div>

                        <button
                            type="button"
                            className="
            btn btn-outline 
            w-full
            hover:bg-base-200
          "
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-base-content/60">
                            Don't have an account?{' '}
                            <a href="/signup" className="link link-primary font-semibold">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}
