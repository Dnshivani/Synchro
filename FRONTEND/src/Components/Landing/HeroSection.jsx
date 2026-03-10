import React from 'react'

export default function HeroSection() {
    return (
        <div className='  mt-10 mb-10 space-y-4  w-1/2'>
            <h2 className='text-5xl font-bold  text-center  '> Organize people, projects, and tasks — all in one workspace</h2>
            <p className='text-sm text-neutral font-medium p-3'>Create workspaces, manage projects with clear ownership, and track tasks using a simple Kanban workflow. Built for teams that value clarity and productivity.</p>
            <div className='flex  items-center justify-center flex-row gap-5'>
                <button className=' btn btn-soft btn-lg btn-primary '> Create a Workspace </button>
                <button className='btn btn-soft  btn-lg btn-primary ' > Explore Workspace </button>
            </div>
        </div>
    )
}
