import React from 'react'
import { useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

const PWA = () => {
    const intervalMS = 60 * 60 * 1000

    const updateServiceWorker = useRegisterSW({
        onNeedRefresh() {
            console.log('need refresh')
        },
        onRegistered(r) {
            console.log('registered')
            r && setInterval(() => {
                r.update()
            }, intervalMS)
        }
    })

    return (
        <div className='card'>

        </div>
    )
}

export default PWA