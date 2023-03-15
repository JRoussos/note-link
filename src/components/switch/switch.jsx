import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'

import loadable from '@loadable/component'
import { useStore } from '../../contexts/store'

import './switch-styles.scss'

const Login     = loadable(() => import('../../pages/login/login'))
const Register  = loadable(() => import('../../pages/register/register'))
const Home      = loadable(() => import('../../pages/home/home'))
const Create    = loadable(() => import('../../pages/create/create'))
const Note      = loadable(() => import('../../pages/note/note'))

const PrivateOutlet = () => {
    const { currentUser } = useStore()
    return currentUser ? <Outlet /> : <Navigate to="/" />
}

const Switch = () => {
    const routerLocation = useLocation()

    const [currentLocation, setCurrentLocation] = useState(routerLocation)
    const [transitionState, setTransitionState] = useState("fadeIn")

    useEffect(() => {
        if (routerLocation !== currentLocation) setTransitionState("fadeOut")

    }, [routerLocation, currentLocation])

    const handleAnimationEnd = () => {
        if (transitionState === "fadeOut") {
            setTransitionState("fadeIn")
            setCurrentLocation(routerLocation)
        }
    }

    return (
        <div className={`default-state`}> {/* onAnimationEnd={handleAnimationEnd}> */}
            <Routes> {/* location={currentLocation} key={currentLocation.key} */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<PrivateOutlet />}>
                    <Route path="" element={<Home />} />
                </Route>
                <Route path="/create/:id?" element={<PrivateOutlet/>}>
                    <Route path="" element={<Create />} />
                </Route>
                <Route path="/note/:id" element={<PrivateOutlet/>}>
                    <Route path="" element={<Note/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}

export default Switch
