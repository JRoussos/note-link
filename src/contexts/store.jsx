import React, { useReducer, useContext, useState, useEffect } from 'react';
import { initialState, reducer } from './state';

import { auth, db } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, updateProfile, signOut } from 'firebase/auth'
import { collection, addDoc, doc, deleteDoc, query, where, orderBy, updateDoc, getDoc, onSnapshot } from 'firebase/firestore'

import { useDeviceSelectors } from 'react-device-detect'
import * as linkify from 'linkifyjs';

const Store = React.createContext(initialState)

const useStore = () => useContext(Store)

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [currentUser, setCurrentUSer] = useState(null)
    const [isLoading, setLoadingState] = useState(true)

    const [selectors] = useDeviceSelectors(window.navigator.userAgent)
     
    const provider = new GoogleAuthProvider()

    const emailLogIn = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const emailSignIn = (username, email, password) => createUserWithEmailAndPassword(auth, email, password).then(user => updateProfile(user, { displayName: username }))
    const googleSignIn = () => signInWithPopup(auth, provider)
    const logOut = () => signOut(auth).then(() => {
        dispatch({ type: 'CHANGE_RECEIVED_SORTED_NOTES', receivedSortedNotes: [] })
        dispatch({ type: 'CHANGE_HASHTAG_ARRAY', hashtagArray: [] })
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUSer(user)
            setLoadingState(false)
        })
        return unsubscribe
    }, [])
    
    const checkTextForHashtags = value => {
        const tagsDetected = [selectors.deviceType]
        const uniqueValuesArray = new Set( linkify.find(value).map(finding => finding.type) ) 
        
        tagsDetected.push(...uniqueValuesArray)
        return tagsDetected
    }

    const pushNote = (noteID, noteContent, noteLength) => {
        const dateCreated = new Date().toISOString()
        const hashtagArray = checkTextForHashtags(noteContent)

        const userID = currentUser.uid

        if ( noteID ) {
            const _docRef = doc(db, 'notes', noteID)
            return updateDoc(_docRef, { dateCreated, hashtagArray, noteContent, noteLength })
        } else {
            const _ref = collection(db, 'notes')
            return addDoc(_ref, { dateCreated, hashtagArray, noteContent, noteLength, userID })
        }
    }

    const deleteNote = noteID => {
        const _docRef = doc(db, 'notes', noteID)
        return deleteDoc(_docRef)
    }

    const fetchNote = noteID => {
        if( noteID ) {
            const _docRef = doc(db, 'notes', noteID)
            return getDoc(_docRef)
        }
        
        const _ref = collection(db, 'notes')
        const _query = query(_ref, orderBy('dateCreated', 'desc'), where('userID', '==', currentUser.uid))

        // return getDocs(_query)
        return onSnapshot(_query, querySnapshot => {
            const sortedNotes = querySnapshot.docs.map( doc => ({ ...doc.data(), id: doc.id }))
            
            sessionStorage.setItem('_receivedSortedNotes', JSON.stringify(sortedNotes))
                
            const flattenArray = sortedNotes.flatMap( note => note.hashtagArray )

            dispatch({ type: 'CHANGE_RECEIVED_SORTED_NOTES', receivedSortedNotes: sortedNotes })
            dispatch({ type: 'CHANGE_HASHTAG_ARRAY', hashtagArray: flattenArray })
        })
    }

    const logError = error => {
        dispatch({ type: 'CHANGE_TOAST_LOG', error })
    }

    const storeProviderValues = {
        state, dispatch, logError,
        currentUser, emailLogIn, emailSignIn, googleSignIn, logOut,
        pushNote, deleteNote, fetchNote
    }

    return <Store.Provider value={storeProviderValues}>{isLoading || children}</Store.Provider>
}

export { useStore, StateProvider }