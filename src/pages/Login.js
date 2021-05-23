import { Logo } from '../components/UI/Logo'
import { Link } from 'react-router-dom'
import { useActions } from '../hooks/use-actions'
import './LoginRegister.scss'
import { useState } from 'react'

const Login = () => {
  const { loginAction } = useActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginButtonHandler = (e) => {
    e.preventDefault()
    loginAction(email, password)
  }

  return (
    <div className='login-page'>
      <div className='logo-wrapper'>
        <Logo width={200} height={200}></Logo>
        <h1>Kanbankeun</h1>
        <p>Organize your task with us</p>
      </div>

      <div className='d-flex flex-column align-items-center'>
        <form onSubmit={(e) => loginButtonHandler(e)}>
          <label htmlFor='email'>Email address</label>
          <input
            className="input-form"
            type='text'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter a valid email address'></input>
          <label htmlFor='password'>Password</label>
          <input
            className='input-form'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'></input>
          <button className='login-button'>Login</button>
        </form>

        <div className='mt-4 register-group'>
          <p className='d-inline-flex'>Don't have an account ?</p>
          <Link to='/v1/register'>
            <p className='d-inline-flex ml-1 register-text'>Register</p>
          </Link>
        </div>
      </div>

    </div >
  )
}

export default Login