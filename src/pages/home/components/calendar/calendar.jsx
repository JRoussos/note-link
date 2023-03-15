import React, { useState } from 'react'
import { useStore } from '../../../../contexts/store'
import './calendar-styles.scss'

const Picker = () => {
    const { dispatch, state } = useStore()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    const currentDate = new Date(state.displayDate[0])
    const [ currentMonth, setCurrentMonth ] = useState( currentDate.getMonth() )

    const handleDateChange = index => {
        setCurrentMonth(index)
        
        dispatch({ type: 'CHANGE_DISPLAY_DATE', displayDate: [
            new Date(currentDate.getFullYear(), index, 1).toISOString(),
            new Date(currentDate.getFullYear(), index+1, 1).toISOString()
        ]})
    }

    return (
        <div className='picker'>
            <div className='row'>
                <span className="material-symbols-rounded">navigate_before</span>
                <p>{ currentDate.getFullYear()}</p>
                <span className="material-symbols-rounded">navigate_next</span>
            </div>
            <div className='month-grid'>
                {months.map((month, index) => (
                    <div key={month} onClick={() => handleDateChange(index)} 
                        className={index === currentMonth ? 'selected month-cell' : 'month-cell'}
                    >
                        <p>{month}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Calendar = () => {
    const [isModalOpen, setModalVisibility] = useState(false)
    const { state } = useStore()

    const handleDateChange = () => {
        setModalVisibility(visibility => !visibility)
    }

    return (
        <React.Fragment>
            <button className='active' style={{ display: 'flex', alignItems: 'center' }} onClick={handleDateChange}>
                <p>{new Date(state.displayDate[0]).toLocaleDateString('en-US', { month: 'long' })}</p>
                <span className="material-symbols-rounded">arrow_drop_down</span>
            </button>
            { isModalOpen && <Picker/>}
        </React.Fragment>
    )
}

export default Calendar