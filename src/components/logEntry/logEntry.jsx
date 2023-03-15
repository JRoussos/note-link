import React from 'react'
import './logEntry-styles.scss'

const LogEntry = ({ note, active }) => {
    return (
        <div className='modification-log-entry'>
            <div className='log-content'>
                <span className='bullet-point'></span>
                <div className={ active ? 'log-wrapper active' : 'log-wrapper'}>
                    <p className='log-text'>Created on {new Date(note.dateCreated).toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    <p className='log-subtext'>{`${note.noteLength} characters`}<span style={{ padding: '0 5px' }}>∙</span>{`${note.hashtagArray.length} tags`}</p>
                </div>
            </div>
        </div>
    )
}

export default LogEntry