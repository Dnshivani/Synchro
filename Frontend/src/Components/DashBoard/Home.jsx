import React from 'react'
import HomeSection from './HomeSection'
import { Link } from 'react-router-dom'
const Home = () => {
    const tasks = [
        { "id": "01", "nameOfWS": "ProjectK", "RoleName": "Designer", "currentTasksDoing": "UI/UXdesign complete chey ", "state": "ready", "submissionDate": "25/4/26" },
        { "id": "02", "nameOfWS": "Peddi", "RoleName": "Producer", "currentTasksDoing": "Inttro editing ", "state": "ready", "submissionDate": "25/4/26" },
        { "id": "03", "nameOfWS": "marriage at VZM", "RoleName": "videographer", "currentTasksDoing": "clips neat ga pampali ", "state": "ready", "submissionDate": "25/4/26" },
    ]
    //iterate
    const iterateTasks = () => {
        return (tasks.map(item => (<Link to="/"> <div className='card card-lg bg-base-100 shadow-sm bg-custom-secondary gap-2 m-2' key="item.id"> {/*navigate to ws*/}
            <p className='font-semibold'> {item.currentTasksDoing}</p>
            <p> <span className='btn btn-sm btn-soft btn-error'>  {item.state}</span>  <span className='btn btn-info btn-soft btn-sm'>{item.RoleName}</span><span className='btn btn-sm btn-soft btn-success'>{item.submissionDate}</span></p>
            <p className='btn text-center btn-soft btn-accent'> {item.nameOfWS}</p>

        </div></Link>))

        )
    }

    return (
        <div>
            <HomeSection />

            <div className='grid grid-flow-col-dense gap-4'>
                {iterateTasks()}
            </div>


        </div>
    )
}

export default Home

/*
hero section motivating undali,
kindha tasks  {sample} name of workspace,his role in that , 

*/
