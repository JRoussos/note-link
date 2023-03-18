import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useStore } from '../../contexts/store'

const Overscroll = ({ className="", children, fallback }) => {
    const overscrollRef = useRef(null)
    const config = { startPoint: 0, pullChange: 0, isDragging: false, limit: 230 }

    const navigate = useNavigate()
    const { state } = useStore()
 
    const handleTouchStart = event => {
        if( window.scrollY !== 0 ) return
        config.isDragging = true    
        
        const { screenY } = event.targetTouches[0]
        config.startPoint = screenY
    }

    const overscrollHandler = () => {
        if ( config.isDragging ) return
        if ( overscrollRef.current ) {
            config.pullChange -= config.pullChange * 0.1
            overscrollRef.current.style.transform = `translate3d(0, ${Math.floor(config.pullChange)/ 2.118}px, 0)`
        }

        if ( config.pullChange > 0.05 ) requestAnimationFrame(overscrollHandler)
    }

    const handleTouchMove = event => {
        if ( !config.isDragging ) return
        const { screenY } = event.targetTouches[0]

        if ( config.startPoint < screenY || document.body.classList.contains('no-scroll') ) {
            document.body.classList.toggle('no-scroll', config.isDragging)
        }

        config.pullChange = config.startPoint < screenY ? Math.min(Math.abs(screenY - config.startPoint), config.limit) : 0
        overscrollRef.current.style.transform = `translate3d(0, ${config.pullChange/ 2.118}px, 0)`
    }

    const handleTouchEnd = () => {
        if (config.pullChange >= config.limit && window.scrollY === 0) 
            navigate('/create') // console.log('run navigation')

        config.isDragging = false
        document.body.classList.toggle('no-scroll', config.isDragging)
        overscrollHandler()
    }

    useEffect(() => {
        window.addEventListener("touchstart", handleTouchStart)
        window.addEventListener("touchmove", handleTouchMove)
        window.addEventListener("touchend", handleTouchEnd)

        return () => {
            window.removeEventListener("touchstart", handleTouchStart)
            window.removeEventListener("touchmove", handleTouchMove)
            window.removeEventListener("touchend", handleTouchEnd)
        }
    }, [])

    return (
        <div ref={overscrollRef} className={"overflow-container" + className}>
            {state.receivedNotesStatus ? fallback : children }
        </div>
    )
}

export default Overscroll