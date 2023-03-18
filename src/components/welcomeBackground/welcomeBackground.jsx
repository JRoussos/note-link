import React from 'react'
import { createPortal } from 'react-dom'

import './welcomeBackground-styles.scss'

const WelcomeBackground = () => {
    return createPortal(
        <div className='background-welcome-image'></div>, document.getElementById('root')
    )
}

export default WelcomeBackground