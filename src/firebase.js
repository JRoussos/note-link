import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"
import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const messaging = getMessaging(app)

enableIndexedDbPersistence(db).catch(error => {
    if (error.code == 'failed-precondition')
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a a time.')
    else if (error.code == 'unimplemented')
        console.warn('The current browser does not support all of the features required to enable persistence')
})

export default app;