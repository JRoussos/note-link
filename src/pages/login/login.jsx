import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import LoadingRing from '../../components/loading/loading'

import googleLogo from '../../assets/google-logo.svg'
import undrawLogin from '../../assets/n.svg'

import { useStore } from '../../contexts/store'
import WelcomeBackground from '../../components/welcomeBackground/welcomeBackground'

import './login-styles.scss'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setLoadingStatus] = useState(false)

    const { currentUser, emailLogIn, googleSignIn, logError } = useStore()

    const navigate = useNavigate()

    const validateCredentials = () => {
        const validated = {
            email: null,
            password: null
        }

        if (email.length >= 4 && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
            validated.email = email.replace(/\s+/g, '')

        if (password.length >= 8)
            validated.password = String(password)

        return {
            validatedEmail: validated.email,
            validatedPassword: validated.password
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault()

        const { validatedEmail, validatedPassword } = validateCredentials()
        if (validatedEmail === null || validatedPassword === null) return

        try {
            setLoadingStatus(true)
            const userCredential = await emailLogIn(validatedEmail, validatedPassword)
            const user = userCredential.user

            console.log(user)
        } catch (error) {
            console.warn(error.code, error.message)

            setLoadingStatus(false)
            logError(error)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await googleSignIn()
            const user = userCredential.user

            console.log(user)
        } catch (error) {
            console.warn(error.code, error.message)
            logError(error)
        }
    }

    useEffect(() => {
        if (currentUser) navigate('/home')
    }, [currentUser])

    return (
        <div className='login'>
            <div className='welcome-message'>
                <WelcomeBackground/>
                {/* <img src={undrawLogin} alt='undrawLogin' style={{ width: '100px', borderRadius: 0 }} />
                <p style={{ color: 'rgba(0, 0, 0, 0.7)' }}>NoteLink — Your notes, everywhere</p> */}
                {/* <img src={undrawLogin} alt='undrawLogin' style={{ width: '100%', marginTop: '5vh' }} /> */}
                {/* <p>Create an account and start sharing your notes with all your devices.</p> */}
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className='input-container'>
                    <p className='input-title'>Your email</p>
                    <div className='input-wrapper'>
                        <input type='email' placeholder='Type your email' value={email} onChange={event => setEmail(event.target.value)}></input>
                    </div>
                </div>
                <div className='input-container'>
                    <p className='input-title'>Password</p>
                    <div className='input-wrapper'>
                        <input type='password' placeholder='Type your secret password' value={password} onChange={event => setPassword(event.target.value)}></input>
                    </div>
                </div>
                {/* #0782f9 */}
                <button className='btn' style={{ background: '#4494e3', marginTop: '20px' }}>
                    {isLoading ? <LoadingRing /> : <span style={{ color: '#fff' }}>Login</span>}
                </button>
            </form>
            <div className='line'>
                <div></div>
                <span> or </span>
                <div></div>
            </div>
            <button className='btn' onClick={handleGoogleSignIn}>
                <img src={googleLogo} alt='google-logo' className='image-logo' />
                <span>Continue with Google</span>
            </button>
            <p className='no-account-link'>Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
        </div>
    )
}

export default Login