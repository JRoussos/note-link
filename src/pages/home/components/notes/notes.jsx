import React, { useEffect } from 'react'
import Overscroll from '../../../../components/overscroll/overscroll'

import { useStore } from '../../../../contexts/store'
import Card, { EmptyCard, LoadingCard } from '../card/card'

import './notes-styles.scss'

const Notes = () => {
    const { state, fetchNote } = useStore()

    useEffect(() => {
        return fetchNote()
    }, [])

    return (
        <div className='notes'>
            <EmptyCard/>
            <Overscroll>
                {state.receivedSortedNotes?.length > 0 ? 
                    state.receivedSortedNotes.map(note => <Card key={note.id} note={note}/>) :
                    new Array(3).fill('').map( (_, index) => <LoadingCard key={index} />)}
                <p className='subtitle'>You've reached the end</p>
            </Overscroll>
        </div>
    )
}

export default Notes