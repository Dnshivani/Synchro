import React from 'react'

const HomeSection = () => {
    const username = "Shivani";
    const details = [
        { "name": "Total Workspaces", "value": 34, "des": "Joined SuccessFully!!" },
        { "name": "Total Tasks", "value": 10, "des": "completed in this week!" },
        { "name": "Completionn", "value": 45, "des": "performance rate of this week" },

    ];
    const iteratecards = () => {
        return (
            details.map(detail => (<div className='card lg bg-base-100 shadow-sm   card-border card-body  ' >
                <p className='card-title'> {detail.name}   </p>
                <p className='text-custom-primary font-semibold'>{detail.value}  </p>
                <p className='text-body'>  {detail.des}</p>
            </div>))
        )
    }
    return (
        <>
            <div className='card lg mt-5 bg-base-100 shadow-sm bg-custom-secondary   m-4'>

                <p className='text-3xl font-bold'>Welcome {username}</p>
                <p className='text-center  font-semibold'>Here's what's happening with your workspaces   </p>
                <div className='grid grid-cols-3 gap-3 justify-center m-4'>{iteratecards()}</div>
            </div>




        </>
    )
}

export default HomeSection
//home page hero section
//welcome {username}
//line---
// total projects, total tasks ,completion % (overall)