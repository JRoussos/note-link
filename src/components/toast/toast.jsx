import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { useStore } from '../../contexts/store'
import './toast-styles.scss'

const Toast = () => {
    const { state, logError } = useStore()
    const [ isToastShowing, updateVisibilityState ] = useState(false)
    const TIMEOUT_ID = useRef(null)

    const handleCloseToast = () => {
        updateVisibilityState(false)
    }
    const handleTransitionEnd = () => {
        isToastShowing || logError({})
    }

    useEffect(() => {
        state.error.name && updateVisibilityState(true)
        TIMEOUT_ID.current = setTimeout(handleCloseToast, 5000)

        return () => clearTimeout(TIMEOUT_ID.current)
    }, [state.error])

    return createPortal (
        <div className={isToastShowing ? 'toast' : 'toast hidden' } onTransitionEnd={handleTransitionEnd}>
            <div className='toast-header'>
                <div className='toast-header-item' style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden' }}>
                    <span className="material-symbols-rounded" style={{ overflow: 'initial' }}>warning</span>
                    <h1>{ state.error.name }</h1>
                </div>
                <div className='toast-header-item' onClick={handleCloseToast}>
                    <span className="material-symbols-rounded">close</span>
                </div>
            </div>
            <div className='toast-content'>
                <p className='line-wrap'>{ state.error.message }</p>
            </div>
            <div className='toast-countdown'>
                <div className={isToastShowing ? 'countdown-bar animate' : 'countdown-bar'}></div>
            </div>
        </div>, document.getElementById('root')
    )
}

export default Toast