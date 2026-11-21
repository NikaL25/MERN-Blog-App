import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { checkIsAuth, registerUser, } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (status) toast(status)
        if (isAuth) navigate('/')
     }, [status, isAuth, navigate, dispatch])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({username, password}))
            setPassword('')
            setUsername('')
        } catch (error) { console.log(error) }
    }

    return (
        <main className="form-page">
            <form onSubmit={e => e.preventDefault()} className="form-card narrow">
                <header className="form-header">
                    <p className="eyebrow">Join the community</p>
                    <h1 className="form-title">Make room for your voice.</h1>
                    <p className="form-copy">Create an account and start publishing ideas that matter to you.</p>
                </header>
                <div className="form-stack">
                    <label className="field">Username
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Choose a username' />
                    </label>
                    <label className="field">Password
                        <input type='password' value={password} placeholder='Create a password' onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <div className="form-actions">
                        <Link to='/login' className="form-link">Already a member?</Link>
                        <button type='submit' onClick={handleSubmit} className='button-primary'>Create account</button>
                    </div>
                </div>
            </form>
        </main>
    )
}
