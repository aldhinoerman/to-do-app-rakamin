import { Logo } from '../components/UI/Logo'
import { Link } from 'react-router-dom'
import './LoginRegister.scss'
import { useState } from 'react'
import { useActions } from '../hooks/use-actions'

const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confPassword, setConfPassword] = useState()
  const { registerAction } = useActions()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    registerAction(name, email, password, confPassword)
  }

  return (
    <div className='login-page'>
      <div className='logo-wrapper'>
        <Logo width={200} height={200}></Logo>
        <h1>Kanbankeun</h1>
        <p>Organize your task with us</p>
      </div>

      <div className='d-flex flex-column align-items-center'>
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <label for='name'>Name</label>
          <input
            className="input-form"
            type='text'
            name='email'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'></input>
          <label for='email'>Email address</label>
          <input
            className="input-form"
            type='text'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter a valid email address'></input>
          <label for='password'>Password</label>
          <input
            className='input-form'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'></input>
          <label for='password-conf'>Confirm your password</label>
          <input
            className="input-form"
            type='password'
            name='password-conf'
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            placeholder='Re-enter password'></input>
          <button className='login-button'>Register</button>
        </form>

        <div className='mt-4 register-group'>
          <p className='d-inline-flex'>Do you have an account ?</p>
          <Link to='/v1/login'>
            <p className='d-inline-flex ml-1 register-text'>Login</p>
          </Link>
        </div>
      </div>

    </div >
  )
}

export default Register