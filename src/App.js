import './App.scss'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
import { BeatLoader } from 'react-spinners'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useActions } from './hooks/use-actions'

const spinnerStyling = css`
  position: fixed;
  top: 50%;
  right: 50%;
`

const App = () => {
  const loading = useSelector(state => state.loading)
  const errorMessage = useSelector(state => state.errorMessage)
  const successMessage = useSelector(state => state.successMessage)
  const isUserAuthenticated = useSelector(state => state.authToken !== null)
  const { checkAuthenticationAction } = useActions()

  useEffect(() => {
    checkAuthenticationAction()
  }, [checkAuthenticationAction])

  let routes = (
    <Switch>
      <Route path='/v1/login' exact component={Login} />
      <Route path='/v1/register' exact component={Register} />
      <Redirect to="/v1/login" />
    </Switch>
  )

  if (isUserAuthenticated) {
    routes = (
      <Switch>
        <Route path='/v1' exact component={Home} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (<>
    {routes}
    <BeatLoader css={spinnerStyling} loading={loading}></BeatLoader>
    {errorMessage && <Notification notifType='danger' notifMessage={errorMessage}>
    </Notification>}
    {successMessage && <Notification notifMessage={successMessage}>
    </Notification>}
  </>)
}

export default App