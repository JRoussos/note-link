import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import { useStore } from '../../contexts/store'

import './menu-styles.scss'

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

    const handleEditContent = () => {
        navigate(`/create/${note.id}`, { state: note })
    }

    const handleShare = async () => {
        await navigator.share({ text: note.noteContent })
    }

    return createPortal (
        <div className='menu-window' onClick={() => setOpenState(state => !state)}>
            <div className='menu-container'>
                <button onClick={handleShare}>
                    <h4>Share</h4>
                </button>
                <button onClick={handleEditContent}>
                    <h4>Edit</h4>
                </button>
                <button onClick={handleDelete}>
                    <h4 className="danger">Delete</h4>
                </button>
            </div>
        </div>, document.getElementById('root')
    )
}

const VerticalDotMenu = ({ children, horizontal=false }) => {
    const [isOpen, setOpenState] = useState(false)

    const handleClick = () => {
        setOpenState(state => !state)
    }

    // const handleBlur = event => {
    //     if( event.currentTarget.matches(':focus-within') ) return
    //     setOpenState(false)
    // }

    return (
        <div style={{ display: 'inline-block' }}>
            <button className='kebab-menu' onClick={handleClick}>
                <span className="material-symbols-rounded">{horizontal ? 'more_horiz' : 'more_vert'}</span>
            </button>
            {isOpen && React.cloneElement(children, { setOpenState })}
        </div>
    )
}

export default VerticalDotMenu