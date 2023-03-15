import React from 'react'
import Calendar from '../../../calendar/calendar'

const Hashtags = ({ array, state, dispatch }) => {

    const handleClick = title => {
        const array = state.activeHashtags
        const returnArray = array.includes(title) ? array.filter(el => el !== title) : [ ...array, title ]
        
        dispatch({ type: 'CHANGE_ACTIVE_HASHTAGS', activeHashtags: returnArray })
    } 
    
    return (
        <React.Fragment>
            <Calendar/>
            {array.map( title => (
                <button key={title} onClick={() => handleClick(title)} className={Boolean(state.activeHashtags.find(id => id === title)) ? 'active' : null}>
                    <p>{ title }</p>
                </button>)
            )}
        </React.Fragment>
    )
}

export default Hashtags