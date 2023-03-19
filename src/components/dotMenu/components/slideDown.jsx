import React, {useEffect, useRef} from 'react'

const SlideDown = ({ children, setOpenState }) => {
    const dragRef = useRef(null)
    const config = { startPoint: 0, pullChange: 0, distance: 0, isDragging: false, limit: 150 }

    const slideHandler = () => {
        if (config.isDragging) return
        if (dragRef.current) {
            config.pullChange -= (config.pullChange - config.distance) * 0.1
            dragRef.current.style.transform = `translate3d(0, ${Math.floor(config.pullChange)/ 2.118}px, 0)`
        }

        if (Math.abs(config.pullChange) > 0.05 && Math.abs(config.pullChange) < 470) 
            requestAnimationFrame(slideHandler)
        else if(Math.abs(config.pullChange) >= 370) 
            setOpenState(false)

    }

    const handleTouchStart = event => {
        event.stopPropagation()

        config.isDragging = true    
        
        const { screenY } = event.targetTouches[0]
        config.startPoint = screenY - config.pullChange
    }

    const handleTouchMove = event => {
        if ( !config.isDragging ) return
        const { screenY } = event.targetTouches[0]

        config.pullChange = config.startPoint < screenY ? Math.abs(screenY - config.startPoint) : 0
        dragRef.current.style.transform = `translate3d(0, ${config.pullChange/ 2.118}px, 0)`
    }

    const handleTouchEnd = () => {
        config.isDragging = false
        if (config.pullChange > config.limit) config.distance = 560
        else config.distance = 0
        
        slideHandler()
    }

    const handleClick = () => {
        config.distance = 680
        slideHandler()
    }

    return (
        <div className='menu-window' onClick={handleClick} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div ref={dragRef} className='drag-container open'>{children}</div>
        </div>
    )
}

export default SlideDown