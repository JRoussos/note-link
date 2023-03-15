// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyB6j1YFjWWx2-80i1Hl3iY0DzBEHCI14S4",
    authDomain: "noted-68374.firebaseapp.com",
    projectId: "noted-68374",
    storageBucket: "noted-68374.appspot.com",
    messagingSenderId: "143400981495",
    appId: "1:143400981495:web:ae7182d8fc5ce05c0554f2",
    measurementId: "G-39SQ6JBFY6"
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload)

    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    return self.registration.showNotification(notificationTitle, notificationOptions)
})