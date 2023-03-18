import React, { useEffect } from 'react'
import Overscroll from '../../../../components/overscroll/overscroll'

import { useStore } from '../../../../contexts/store'
import Card, { EmptyCard, WelcomeCard, LoadingCardMultiple } from '../card/card'

import './notes-styles.scss'

const Notes = () => {
    const { state, fetchNote } = useStore()

    useEffect(() => {
        return fetchNote()
    }, [])

    return (
        <div className='notes'>
            <EmptyCard>Pull down to add new note</EmptyCard>
            <Overscroll fallback={<WelcomeCard/>}>
                {state.receivedSortedNotes?.length > 0 ? <React.Fragment>
                    {state.receivedSortedNotes.map( note => <Card key={note.id} note={note}/> )}
                    <p className='subtitle'>You've reached the end</p>
                </React.Fragment> : <LoadingCardMultiple amount={3}/> }
            </Overscroll>
        </div>
    )
}

export default Notes