import React, { useState } from 'react'

export default function HowItworks() {

    const Steps = [
        { "id": "01", "title": " Create a Workspace", "des": "Set up your project with clear goals and structure." },
        { "id": "02", "title": "Assign Roles & Tasks", "des": "Organize work by roles, not individuals." },
        { "id": "03", "title": "Track Tasks", "des": "Monitor task status and team coordination." },
    ]

    const iterateSteps = () => {
        return (Steps.map(
            step => (
                <div className=" p-10 rounded-xl shadow-lg dark:bg-gray-50 dark:text-gray-900 flex flex-col justify-center " key={step.id}>
                    <div className="mt-6 mb-2">
                        <span className="block text-xs font-medium tracking-widest uppercase dark:text-green-600"> Step- {step.id}</span>
                        <h2 className="text-xl font-semibold tracking-wide">{step.title}</h2>
                    </div>
                    <p className="dark:text-gray-800">{step.des} </p>
                </div>
            )))
    }

    const BuiltFor = [
        { "id": "11", "title": "Students & Study Groups", "des": "Manage client projects, deadlines, and deliverables in one place." },
        { "id": "12", "title": "Startups & Small Teams", "des": "Scale your workflow from MVP to product launch with clear ownership." },
        { "id": "11", "title": "Events & Communities", "des": "Coordinate volunteers, plan activities, and track event milestones." },
    ]

    const iterateFor = () => {
        return (
            BuiltFor.map(fors => (

                <div key={fors.id} className=" min-w-[280px] h-56 bg-white border border-green-100 rounded-2xl p-8 flex flex-col justify-between shadow-sm">
                    <h2 className="text-2xl font-semibold text-green-700 mb-3">{fors.title}</h2>
                    <p className='text-gray-600 leading-relaxed'>{fors.des}</p>
                </div>


            ))
        )
    }


    return (

        <div className='  justify-items-center '>


            <h2 className="text-2xl font-bold text-gray-800  text-center mt-3">
                Designed to work for every team
            </h2>

            <div className=" relative w-full flex gap-8 py-10 px-4 overflow-x-auto scrollbar-hide">

                {iterateFor()}

            </div>


            <p className='text-2xl font-bold text-gray-800 mt-3'>  Get started in three simple steps</p>
            <div className="max-h-screen grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                {iterateSteps()}
            </div>

        </div>
    )
}
