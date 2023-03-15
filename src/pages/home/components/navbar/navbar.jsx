import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import VerticalDotMenu, { MenuWindow } from '../../../../components/dotMenu/dotMenu'

import { useStore } from '../../../../contexts/store'

import './navbar-styles.scss'

const NavBar = () => {
    const navigate = useNavigate()
    const rowRef = useRef()

    const { logOut, state, dispatch, currentUser } = useStore()

    const handleSignOut = async () => {
        try {
            await logOut()
            navigate("/")
        } catch (error) {
            console.warn(error.code, error.message)
        }
    }

    console.log(currentUser)

    return (
        <header className='card profile'>
            <header className='card-header'>
                <div className='header-item'>
                    <div className='profile-wrapper'>
                        <div className='profile-picture'>
                            <img src={currentUser.photoURL || 'https://cdn.dribbble.com/users/1175294/avatars/small/33d5e5a25cc556ee7538eaf4b5808a0e.jpeg?1589591872'} alt='profile-photo'/>
                        </div>
                        <div className='profile-info'>
                            <h4>{currentUser.displayName}</h4>
                            <p>{currentUser.email}</p>
                        </div>
                    </div>
                    <VerticalDotMenu>
                        <MenuWindow/>
                    </VerticalDotMenu>
                </div>
                <div className='header-item'>
                    
                </div>
            </header>
        </header>
    )
}

export default NavBar