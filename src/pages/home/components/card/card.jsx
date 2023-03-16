import React from 'react'
import { useNavigate } from 'react-router-dom'

import * as timeago from 'timeago.js'
import TimeAgo from 'timeago-react'
import en_short from 'timeago.js/lib/lang/en_short'

import ReactMarkdown from 'react-markdown'

import VerticalDotMenu, { MenuWindow } from '../../../../components/dotMenu/dotMenu'
import './card-styles.scss'

export const EmptyCard = ({ }) => {
    return (
        <div className='card empty'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ marginTop: '14px' }} className="material-symbols-rounded">add_circle</span>
                <p>Pull down to add new note</p>
            </div>
        </div>
    )
}

export const LoadingCard = () => {
    return (
        <div className='card loading'>
            <header className='card-header'>
                <div className='header-item'>
                    <div className='skeleton-content line'></div>
                </div>
                <div className='header-item'>
                    <div className='skeleton-content line'></div>
                </div>
            </header>
            <article className='note-content'>
                <div className='skeleton-content text'></div>
            </article>
        </div>
    )
}

export const LoadingCardMultiple = ({ amount }) => {
    return new Array(amount).fill('').map( (_, index) => <LoadingCard key={index}/> )
}

const Card = ({ note }) => {
    const { dateCreated, hashtagArray, noteContent, noteLength, id } = note

    const navigate = useNavigate()
    timeago.register('en_short', en_short)

    return (
        <div className='card'>
            <header className='card-header'>
                <div className='header-item'>
                    <p className='header-title-paragraph' style={{ margin: '4px 0 0 0' }}>
                        <span className="material-symbols-rounded" style={{ paddingRight: '10px' }}>event_note</span>
                        <TimeAgo datetime={dateCreated} locale={'en_short'} />
                        <span style={{ padding: '0 5px' }}>∙</span>
                        {noteLength === 1 ? `${noteLength} characters` : `${noteLength} character`}
                    </p>
                    <VerticalDotMenu horizontal>
                        <MenuWindow note={note} />
                    </VerticalDotMenu>
                </div>
                <div className='header-item'>
                    <div className='hashtags'>
                        {hashtagArray.map(tag => <p key={tag}>#{tag}</p>)}
                    </div>
                </div>
            </header>
            <article className='note-content' onClick={() => navigate(`/note/${id}`, { state: note })}>
                {/* <p>{noteContent}</p> */}
                <ReactMarkdown children={noteContent} />
            </article>
        </div>
    )
}

export default Card