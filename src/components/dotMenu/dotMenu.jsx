import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import { useStore } from '../../contexts/store'
import SlideDown from './components/slideDown'

import './menu-styles.scss'

export const UserMenu = () => {
    const { logError, logOut } = useStore()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logOut()
            navigate("/")
        } catch (error) {
            console.warn(error.code, error.message)
            logError(error)
        }
    }

    return (
        <div className='menu-container'>
            <button onClick={handleLogout}>
                <div className='menu-option danger current-user'>
                    <h4>Logout</h4>
                </div>
            </button>
        </div>   
    )
}

export const MenuWindow = ({ note, onDelete, setOpenState }) => {
    const { deleteNote, logError } = useStore()
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await deleteNote(note.id)
            console.log('Doc deleted: ', note.id)
            if ( onDelete ) onDelete()
        } catch (error) {
            console.warn(error.code, error.message);    
            logError(error)
        }
    }

    return createPortal (
        <SlideDown setOpenState={setOpenState}>
            {note && <div className='menu-container'>
                <button onClick={async () => await navigator.share({ text: note.noteContent })}>
                    <div className='menu-option'>
                        <h4>Share</h4>
                    </div>
                </button>
                <button onClick={() => navigate(`/create/${note.id}`, { state: note })}>
                    <div className='menu-option'>
                        <h4>Edit</h4>
                    </div>
                </button>
                <button onClick={handleDelete}>
                    <div className='menu-option danger'>
                        <h4>Delete</h4>
                    </div>
                </button>
            </div>}
            <UserMenu/>
        </SlideDown>, document.getElementById('root')
    )
}

const VerticalDotMenu = ({ children, horizontal=false }) => {
    const [isOpen, setOpenState] = useState(false)

    return (
        <div style={{ display: 'inline-block' }}>
            <button className='kebab-menu' onClick={() => setOpenState(state => !state)}>
                <span className="material-symbols-rounded">{horizontal ? 'more_horiz' : 'more_vert'}</span>
            </button>
            {isOpen && React.cloneElement(children, { setOpenState })}
        </div>
    )
}

export default VerticalDotMenu