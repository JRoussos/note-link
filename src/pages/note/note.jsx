import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import QRCode from 'react-qr-code';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

import { useStore } from '../../contexts/store'
import { LoadingCard } from '../home/components/card/card';
import Topper from '../../components/topper/topper';
import VerticalDotMenu, { MenuWindow } from '../../components/dotMenu/dotMenu'


import '../home/components/card/card-styles.scss'
import './note-styles.scss'
import LogEntry from '../../components/logEntry/logEntry';

const Note = () => {
    const { id } = useParams()

    const location = useLocation()
    const navigate = useNavigate()

    const { fetchNote, logError } = useStore()

    const [note, updateNote] = useState(location.state || {})
    const [isAccordionOpen, setAccordionState] = useState(false)

    const [activeHeart, setHeart] = useState('')

    const getNote = async () => {
        try {
            const querySnapshot = await fetchNote(id)
            updateNote(querySnapshot.data())
        } catch (error) {
            logError(error)
        }
    }

    const formatDate = (value, length = 'short', locale = 'en-US') => {
        const _date = new Date(value)
        return `${_date.toLocaleDateString(locale, { day: '2-digit', month: length, year: 'numeric' })} ∙ ${_date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })}`
    }

    const handleBackBtn = () => {
        location.state ? navigate(-1) : navigate('/home')
    }

    const handleEditContent = () => {
        navigate(`/create/${id}`, { state: note })
    }

    useEffect(() => {
        getNote()
    }, [])

    return (
        <Topper>
            <div className='full-note'>
                <header className='header'>
                    <button onClick={handleBackBtn}>
                        <span className="material-symbols-rounded">keyboard_backspace</span>
                    </button>
                    <div>
                        <button onClick={() => setHeart(state => state ? '' : ' active')}>
                            <span className={"material-symbols-rounded heart-icon" + activeHeart}>favorite</span>
                        </button>
                        <VerticalDotMenu>
                            <MenuWindow note={note} onDelete={handleBackBtn}/>
                        </VerticalDotMenu>
                    </div>
                </header>
                { Object.keys(note).length > 0 ? 
                    <React.Fragment>
                        <div className='card'>
                            <header className='card-header' style={{ alignItems: 'flex-start'}}>
                                <div className='header-item'>
                                    <div style={{ margin: '4px' }}>
                                        <p>{formatDate(note.dateCreated, 'long')}</p>
                                    </div>
                                    <div onClick={handleEditContent}>
                                        <span className="material-symbols-rounded">edit_note</span>
                                    </div>
                                </div>
                                <div className='header-item'>
                                    <div className='hashtags'>
                                        {note.hashtagArray.map(tag => <p key={tag}>#{tag}</p>)}
                                    </div>
                                </div>
                                
                            </header>
                            <article className='note-content'>
                                {/* <p>{note.noteContent}</p> */}
                                <ReactMarkdown children={note.noteContent} remarkPlugins={[remarkGfm]} />
                            </article>
                        </div>
                        <div className='card'>
                            <header className='card-header' onClick={() => setAccordionState(state => !state)}>
                                <div className='header-item'>
                                    <p className='header-title-paragraph'><span className="material-symbols-rounded" style={{ paddingRight: '10px' }}>draft</span>Change Log</p>
                                    <span className="material-symbols-rounded">{isAccordionOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</span>
                                </div>
                            </header>
                            <article className='note-content logs-container'>
                                <LogEntry note={note} active/>
                                <div className={isAccordionOpen ? 'accordion-view' : 'accordion-view close'}>
                                    <LogEntry note={note}/>
                                    <LogEntry note={note}/>
                                </div>
                            </article>
                        </div>
                        <div className='card'>
                            <header className='card-header'>
                                <div className='header-item'>
                                    <p className='header-title-paragraph'><span className="material-symbols-rounded" style={{ paddingRight: '10px' }}>qr_code</span>Note in QR Form</p>
                                </div>
                            </header>
                            <article className='note-content' style={{ textAlign: 'center' }} onClick={() => console.log('qr click')}>
                                <QRCode value={note.noteContent || " "} size={300} level={'M'} style={{ margin: '14px 0' }}/>
                            </article>
                        </div>
                    </React.Fragment> : new Array(2).fill('').map( (_, index) => <LoadingCard key={index} />)
                }
            </div>
        </Topper>
    )
}

export default Note