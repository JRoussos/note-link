import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import ShortUniqueId from 'short-unique-id'

import { useStore } from '../../contexts/store'
import './create-styles.scss'

const Create = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { id } = useParams()
    
    const [noteContent, setNoteContent] = useState(location.state?.noteContent || '')
    const [noteLength, setNoteLength] = useState(location.state?.noteLength || 0)
    
    const { pushNote, logError, dispatch } = useStore()
    const uid = new ShortUniqueId({ length: 20 })

    const handleBackBtn = () => {
        const updatedNote = { ...location.state, noteContent, noteLength }
        dispatch({ type: 'CHANGE_TEMP_NOTE', tempNote: updatedNote})

        location.state ? navigate(-1) : navigate('/home')
    }

    const moveCaretEnd = event => {
        const temp_value = event.target.value
        event.target.value = ''
        event.target.value = temp_value
    }

    const getSearchParams = () => {
        const parsedUrl = new URL(window.location)
        
        if ( parsedUrl.searchParams.has('title') || parsedUrl.searchParams.has('text') || parsedUrl.searchParams.has('url') ) {
            const searchParams = [ 
                parsedUrl.searchParams.get('title'),
                parsedUrl.searchParams.get('text'),
                parsedUrl.searchParams.get('url')
            ]

            setNoteContent( searchParams.filter(Boolean).join('\n\n') )
            setNoteLength( noteContent.trim().split('').length )
        }
    }

    const handleSubmitFinishedNote = () => {
        try {
            const old_noteContent = { ...location.state, id: uid(), noteChanges: null }
            pushNote(id, noteContent, noteLength, old_noteContent).then(docRef => {
                console.log('Pushed Data Successfully: ', docRef?.id || id)
            })

            handleBackBtn()
        } catch (error) {
            console.warn(error.code, error.message);
            logError(error)
        }
    }

    const handleTextChange = event => {
        setNoteContent(event.target.value)
        setNoteLength(event.target.value.trim().split('').length)
    }

    useEffect(() => {
        getSearchParams()
    }, [])

    return (
        <div className='create'>
            <header className='header'>
                <button onClick={handleBackBtn}>
                    <span className="material-symbols-rounded">keyboard_backspace</span>
                    {/* <span className='arrow'></span> */}
                </button>
                <button className='submit-btn' onClick={handleSubmitFinishedNote}>
                    <p>Save</p>
                </button>
            </header>
            <article className='content'>
                <p>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                    <span style={{ padding: '0 5px' }}>∙</span>
                    <span style={{ textTransform: 'lowercase' }}>{`${noteLength} characters`}</span>
                </p>
                <textarea value={noteContent} onChange={handleTextChange} autoFocus onFocus={moveCaretEnd} />
            </article>
        </div>
    )
}

export default Create