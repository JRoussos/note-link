import React, { useEffect, useState } from 'react'

import { collection, query, orderBy, getDocs, where } from 'firebase/firestore'
import { db } from '../firebase'



import { useStore } from '../contexts/store'

import React from 'react'

const ManageNotes = () => {


}

export default ManageNotes

const [selectors] = useDeviceSelectors(window.navigator.userAgent)

const checkTextForHashtags = value => {
    const tagsDetected = [selectors.deviceType]
    
    tagsDetected.push(...linkify.find(value).map(finding => finding.type))
    
    console.log(tagsDetected);
    
    return tagsDetected
}

export const pushNote = (noteContent, noteLength) => {
    const { currentUser } = useStore()
    
    const dateCreated = new Date().toISOString()
    const hashtagArray = checkTextForHashtags(noteContent)

    const userID = currentUser.uid

    // const _ref = collection(db, 'notes')
    // return addDoc(_ref, { dateCreated, hashtagArray, noteContent, noteLength, userID })

    return hashtagArray
}

// export const useDeleteNote = () => {

// }

// export const useGetNote = () => {

// }