import React from 'react'
import { Link } from 'react-router-dom';
import DashBoard from './DashBoard';

const Notifications = () => {

    const notifiList = [
        { "id": "01", "content": "hello this is a notification message", "from": "dns", "to": "mee" },
        { "id": "02", "content": "hello this is a notification message", "from": "dns", "to": "mee" },
    ];



    const iterating = () => {
        return (
            notifiList.map(item => (<div key={item.id} className='flex bg-accent'>
                <p className=' flex-1'>  {item.content} </p>
                <div className='dropdown dropdown-end'>
                    <div tabIndex={0} role='button' className=" btn btn-ghost  " >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                    </div>
                    <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <Link to="/dashboard"><li >Reply</li ></Link>
                        <Link to="/dashboard"><li>Open Workspace</li> </Link>
                        <Link to="/dashboard"><li className='text-error'>Delete</li>   </Link>
                    </ul>
                </div>
            </div>

            )))
    }


    return (
        <div className=' space-y-3'>
            {iterating()}
            {notifiList.length == 0 && (<p>no notification</p>)}

        </div>

    )
}

export default Notifications


//flex-1 to keep the content at start and remaining at the end
//change the dropdown linksss

//notification color based on the type of notification or give an icon to it.