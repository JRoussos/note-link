import React, { useEffect } from 'react'
import { useStore } from '../../contexts/store'

import './share-styles.scss'

const Share = () => {
    const useMountEffect = customFunction => useEffect(customFunction, [])
    const { pushNote } = useStore()

    const pushSearchParams = () => {
        // if ( !window.matchMedia('(display-mode: standalone)').matches ) return

        const parsedUrl = new URL(window.location)
        
        if ( parsedUrl.searchParams.has('title') || parsedUrl.searchParams.has('text') || parsedUrl.searchParams.has('url') ) {
            const searchParams = [ 
                parsedUrl.searchParams.get('title'),
                parsedUrl.searchParams.get('text'),
                parsedUrl.searchParams.get('url')
            ]

            const noteContent = searchParams.filter(Boolean).join('\n\n')
            const noteLength = noteContent.trim().split('').length

            console.log(noteContent, noteLength)

            pushNote(noteContent, noteLength).then(docRef => {
                console.log('Pushed Data Successfully: ', docRef.id)
            })
        }
    }

    useMountEffect(pushSearchParams)

    const handleCloseWindow = () => {
        window.close()
    }

    return (
        <div className='share'>
            <div className='share-card'>
                <div className='share-header'>
                    <span className="material-symbols-rounded">check_circle</span>
                </div>
                <div className='share-text-content'>
                    <h4>Note has been created</h4>
                    <p>A notification has been send to your connected devices. You can now safely close the window.</p>
                </div>
                <div className='share-footer'>
                    <button onClick={handleCloseWindow}>Done</button>
                </div>
            </div>
        </div>
    )
}

export default Share