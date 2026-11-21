import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (status) toast(status)
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate, dispatch])

    const handleSubmit = () => {
        try { dispatch(loginUser({username, password})) } catch (error) { console.log(error) }
    }

    return (
        <main className="form-page">
            <form onSubmit={e => e.preventDefault()} className="form-card narrow">
                <header className="form-header">
                    <p className="eyebrow">Welcome back</p>
                    <h1 className="form-title">Sign in to Inkline.</h1>
                    <p className="form-copy">Pick up where your next great story begins.</p>
                </header>
                <div className="form-stack">
                    <label className="field">Username
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your username" />
                    </label>
                    <label className="field">Password
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
                    </label>
                    <div className="form-actions">
                        <Link to='/register' className="form-link">Create an account</Link>
                        <button type='submit' onClick={handleSubmit} className='button-primary'>Sign in</button>
                    </div>
                </div>
            </form>
        </main>
    )
}
