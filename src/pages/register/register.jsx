import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'

import { useStore } from '../../contexts/store'
import '../login/login-styles.scss'
import WelcomeBackground from '../../components/welcomeBackground/welcomeBackground'

const Register = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')

    const [ acceptTerms, setAcceptTerms ] = useState(false)
    const [ isLogging, setStatus ] = useState(true)

    const navigate = useNavigate()
    const { logError } = useStore()

    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    const handleBackBtn = () => navigate(-1)

    const validateCredentials = () => {
        const validated = {
            email: null,
            password: null,
            username: null
        }

        if ( email.length >= 4 && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) )
            validated.email = email.replace(/\s+/g, '')

        if ( password.length >= 8 )
            validated.password = String(password)

        if ( username.length >= 4 ) 
            validated.username = String(username)

        return {
            isWrong: (validated.email === null || validated.password === null || validated.username === null ),
            validatedEmail: validated.email,
            validatedPassword: validated.password,
            validatedUsername: validated.username
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault()

        const { isWrong, validatedEmail, validatedPassword, validatedUsername } = validateCredentials()
        if ( isWrong || !acceptTerms ) return
        
        setStatus(false)

        try {
            const userCredential = await createUserWithEmailAndPassword( auth, validatedEmail, validatedPassword )
            const user = userCredential.user

            await updateProfile(user, { displayName: validatedUsername })

            saveToLocalStorage('user', user)
            saveToLocalStorage('auth_token', userCredential._tokenResponse.refreshToken)
            
            console.log(userCredential)
        } catch (error) {
            console.warn(error.code, error.message)
            
            setStatus(true)
            logError(error)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged( auth, user => {
            setStatus(true)
            if ( user ) navigate('/home', { replace: true })
        })

        return unsubscribe 
    }, [])

    return (
        <div className='register'>
            <div className='welcome-message'>
                <WelcomeBackground/>
                <button onClick={handleBackBtn}>
                    <span className="material-symbols-rounded" style={{ fontWeight: 700 }}>keyboard_backspace</span>
                </button>
                <h1>Sign Up</h1>
                {/* <p>Create an account and start sharing your notes with all your devices.</p> */}
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className='input-container'>
                    <p className='input-title'>Userame</p>
                    <div className='input-wrapper'>
                        <input type='text' placeholder='Type the username of your choosing' value={username} onChange={event => setUsername(event.target.value)}></input>
                    </div>
                </div>
                <div className='input-container'>
                    <p className='input-title'>Email</p>
                    <div className='input-wrapper'>
                        <input type='email' placeholder='Type a valid email' value={email} onChange={event => setEmail(event.target.value)}></input>
                    </div>
                </div>
                <div className='input-container'>
                    <p className='input-title'>Password</p>
                    <div className='input-wrapper'>
                        <input type='password' placeholder='Type at least 8 letters, numbers or symbols' value={password} onChange={event => setPassword(event.target.value)}></input>
                    </div>
                </div>
                <div className='policy-checker'>
                    <div className='label'>
                        <label>
                            <div className='checkbox-wrapper'>
                                {/* { acceptTerms && <span></span> } */}
                                <input type='checkbox' id='accept' name='accept terms' checked={acceptTerms} onChange={() => setAcceptTerms(terms => !terms)}/>
                            </div>
                        </label>
                        {/* & Conditions */}
                        <p>I've read and agree with the <Link to={'#'}>Terms of Service</Link> and the <Link to={'#'}>Privacy Policy</Link></p>                    
                    </div>
                </div>
                <button className='btn' style={{ background: '#4494e3', marginTop: '40px'}}>
                    { isLogging ? 
                        <span style={{ color: '#f6f6f6' }}>Create Account</span> :
                        <div className="loading-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div> }
                </button>
            </form>
        </div>
    )
}

export default Register