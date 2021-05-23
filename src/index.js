import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../src/state/reducers'
import App from './App';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

const store = createStore(reducers, applyMiddleware(thunk))

const Index = () => {
  return (
    <Provider store={store}>
      <Router >
        <Switch>
          <Route path='/v1' component={App} />
          <Redirect to='/v1'></Redirect>
        </Switch>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));
