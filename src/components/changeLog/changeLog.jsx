import React, { useRef } from 'react'
import * as Diff from 'diff'

import './changeLog-styles.scss'
import ShortUniqueId from 'short-unique-id'
import { useStore } from '../../contexts/store'

const LogEntry = ({ note, disabled, index, currentSelectedLog, updateCurrentSelectedLog, log, active=Boolean(currentSelectedLog.index === index) }) => {
    const span = useRef(null)
    const { logError } = useStore()

    const handleLogClick = () => {
        if (disabled) return

        const diff = Diff.diffLines(log.noteContent, note.noteContent, { newlineIsToken: true })
        if (diff.length <= 1) {
            updateCurrentSelectedLog({ index: index, note })
            return
        }

        const noteContent = diff.map( part => {
            const color = part.added ? '#cff2dd' : part.removed ? '#facccc' : ''

            span.current = document.createElement('span')
            span.current.style.background = color
            span.current.innerText = part.value.trim()

            return span.current.outerHTML
        }).join('\n\n')
        
        updateCurrentSelectedLog({ index: index, note: {...note , noteContent} })
    }

    const handleSwapLog = event => {
        event.stopPropagation()

        logError(new Error('That feature is not enable yet'))

        console.log('swap');
    }

    const formatDate = value => {
        return new Date(value).toLocaleDateString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false, day: '2-digit', month: 'long', year: 'numeric' })
    }

    return (
        <div className='modification-log-entry'>
            <div className='log-content'>
                <span className='bullet-point'></span>
                <div className={active ? 'log-wrapper active' : 'log-wrapper'} onClick={handleLogClick} disabled={disabled}>
                    <div style={{ overflow: 'hidden' }}>
                        <p className='log-text'>{formatDate(log.dateEdited || log.dateCreated)}</p>
                        <p className='log-subtext'>
                            {(disabled || (note.id === log.id)) && <span>(Current Version)<span style={{ padding: '0 5px' }}>∙</span></span>}
                            {`${log.noteLength} characters`}<span style={{ padding: '0 5px' }}>∙</span>
                            {`${log.hashtagArray.length} tags`}
                        </p>
                    </div>
                    <button className={(active && (note.id !== log.id)) ? 'swap-btn visible' : 'swap-btn'} onClick={handleSwapLog}>
                        <span className="material-symbols-rounded">swap_vert</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

const ChangeLog = props => {
    const uid = new ShortUniqueId()

    const handleSortingNotes = (note_a, note_b) => {
        const { dateCreated: date_created_a, dateEdited: date_edited_a } = note_a
        const { dateCreated: date_created_b, dateEdited: date_edited_b } = note_b

        const date_a = date_edited_a || date_created_a
        const date_b = date_edited_b || date_created_b

        if (date_a < date_b) return 1
        if (date_a > date_b) return -1

        return 0
    }

    const { note, isAccordionOpen } = props
    const hasLogs = note.noteChanges?.length > 0

    return hasLogs ?
        <div className={isAccordionOpen ? 'accordion-view' : 'accordion-view close'}>
            {[note, ...note.noteChanges].sort(handleSortingNotes).map((log, index) => <LogEntry key={uid()} log={log} index={index} {...props} />)}
        </div> : <LogEntry log={note} note={note} active disabled />
        
}

export default ChangeLog