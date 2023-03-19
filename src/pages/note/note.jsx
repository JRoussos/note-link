import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import { ErrorBoundary } from 'react-error-boundary';
import QRCode from 'react-qr-code';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';

import { useStore } from '../../contexts/store'
import { LoadingCardMultiple } from '../home/components/card/card';
import Topper from '../../components/topper/topper';
import VerticalDotMenu, { MenuWindow } from '../../components/dotMenu/dotMenu'
import ChangeLog from '../../components/changeLog/changeLog';

import '../home/components/card/card-styles.scss'
import './note-styles.scss'

const Note = () => {
    const { id } = useParams()

    const location = useLocation()
    const navigate = useNavigate()

    const { fetchNote, logError } = useStore()

    const [note, updateNote] = useState(location.state || {})
    const [isAccordionOpen, updateAccordionState] = useState(false)

    const [currentSelectedLog, updateCurrentSelectedLog] = useState({ index: 0, note: note })

    const [activeHeart, setHeart] = useState('')

    const getNote = async () => {
        try {
            const querySnapshot = await fetchNote(id)
            updateNote({...querySnapshot.data(), id})
            updateCurrentSelectedLog({ index: 0, note: querySnapshot.data() })
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
                        <button onClick={() => setHeart(state => state ? "" : " active")}>
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
                                    <div>
                                        <p className='header-title-paragraph'><span className="material-symbols-rounded" style={{ paddingRight: '10px', fontSize: '20px' }}>event_note</span>{formatDate(note.dateCreated, 'long')}</p>
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
                                <ReactMarkdown children={currentSelectedLog.note.noteContent} 
                                    remarkPlugins={[remarkGfm]} 
                                    rehypePlugins={[rehypeRaw]} 
                                />
                            </article>
                        </div>
                        <div className='card'>
                            <header className='card-header' onClick={() => updateAccordionState(state => !state)}>
                                <div className='header-item'>
                                    <p className='header-title-paragraph'><span className="material-symbols-rounded" style={{ paddingRight: '10px', fontSize: '20px' }}>draft</span>Change Log</p>
                                    {note.noteChanges?.length >= 0 && <span className="material-symbols-rounded">{isAccordionOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</span>}
                                </div>
                            </header>
                            <article className="note-content logs-container">
                                <ChangeLog note={note} currentSelectedLog={currentSelectedLog} updateCurrentSelectedLog={updateCurrentSelectedLog} isAccordionOpen={isAccordionOpen}/>
                            </article>
                        </div>
                            <div className='card'>
                                <header className='card-header'>
                                    <div className='header-item'>
                                        <p className='header-title-paragraph'><span className="material-symbols-rounded" style={{ paddingRight: '10px', fontSize: '20px' }}>qr_code</span>Note in QR Form</p>
                                    </div>
                                </header>
                                <article className='note-content' style={{ textAlign: 'center' }} onClick={() => console.log('qr click')}>
                                    <ErrorBoundary fallback={<p>QR Couldn't Load</p>}>
                                        <QRCode value={note.noteContent} size={1000} level={'M'} style={{ display: 'block', width: '100%', height: '100%' }}/>
                                    </ErrorBoundary>
                                </article>
                            </div>
                    </React.Fragment> : <LoadingCardMultiple amount={2} />
                }
            </div>
        </Topper>
    )
}

export default Note