import React from 'react'

export default function HeroSection() {
    return (
        <div className='p-6 space-y-3'>
            <h2 className='text-5xl font-bold  text-center  '> Organize people, projects, and tasks — all in one workspace</h2>
            <p className='text-sm text-gray-400 font-medium p-3'>Create workspaces, manage projects with clear ownership, and track tasks using a simple Kanban workflow. Built for teams that value clarity and productivity.</p>
            <div className='flex  items-center justify-center flex-row gap-5'>
                <button className=' btn btn-soft btn-primary hover:text-white-400'> Create a Workspace </button>
                <button className='btn btn-active btn-primary hover:bg-green-200 text-slate-300' > Explore Workspace </button>
            </div>
        </div>
    )
}
