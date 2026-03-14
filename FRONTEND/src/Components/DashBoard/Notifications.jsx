import React from 'react'

const Notifications = () => {

    const notifiList = [
        { "id": "01", "content": "hello this is a notification message", "from": "dns", "to": "mee" },
    ];

    const iterating = () => {
        return (
            notifiList.map(item => (<div key={item.id} className='bg-base-300 card-body  '>
                <p className=' '>{item.content}</p>
                <div className="">
                    <span className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                    </span>
                </div></div>
            )))
    }
    return (
        <div className='card card-lg '>
            {iterating()}
        </div>
    )
}

export default Notifications
