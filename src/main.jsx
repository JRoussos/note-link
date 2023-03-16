import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { StateProvider } from './contexts/store'

import Switch from './components/switch/switch'
import Toast from './components/toast/toast'

import { registerSW } from 'virtual:pwa-register'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StateProvider>
            <Toast />
            <BrowserRouter>
                <Switch />
            </BrowserRouter>
        </StateProvider>
    </React.StrictMode>,
)

if ("serviceWorker" in navigator) {
    registerSW({
        onRegistered(registration) {
            registration && setInterval(() => registration.update(), 3600000) //60 * 60 * 1000
        }
    })
}
// if ("serviceWorker" in navigator) {
//     registerSW({
//         onRegisteredSW(swUrl, registration) {
//             registration && setInterval(async () => {
//                 if (!(!registration.installing && navigator)) return
//                 if (('connection' in navigator) && !navigator.onLine) return

//                 const resp = await fetch(swUrl, {
//                     cache: 'no-store',
//                     headers: {
//                         'cache': 'no-store',
//                         'cache-control': 'no-cache',
//                     }
//                 })

//                 if (resp?.status === 200) await registration.update()
//             }, 3600000)
//         }
//     })
// }