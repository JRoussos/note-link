import React from 'react'

import NavBar from './components/navbar/navbar'
import Notes from './components/notes/notes'

const Home = () => {
    return (
        <div className='home'>
            {/* <NavBar/> */}
            <Notes/>
        </div>
    )
}

export default Home