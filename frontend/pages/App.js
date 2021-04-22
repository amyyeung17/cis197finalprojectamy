import React from 'react'
import ReactDom from 'react-dom'

import s from 'styled-components'

import {
  BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams,
} from 'react-router-dom'

import Welcome from './Welcome'
import Login from './Login'
import CreateAccount from './CreateAccount'
import Profile from './Profile'
import Homepage from './Homepage'
import Follow from './Follow'
import Settings from './Settings'
import SpotifyAdd from './SpotifyAdd'


const App = () => {

  return(
    <>

    <Router>
        <Switch>
          <Route exact path='/'>
            <Homepage />
          </Route>
          <Route path='/welcome'>
            <Welcome />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <CreateAccount />
          </Route>
          <Route path='/creates'>
            <SpotifyAdd />
          </Route>
          <Route path='/callback'>
            <Homepage />
          </Route>
          <Route path='/follows/:username'>
            <Follow />
          </Route>
          <Route exact path='/settings/:username'>
            <Settings />
          </Route>
          <Route exact path='/profile/:username'>
            <Profile />
          </Route>
          
      </Switch>
    </Router>
  </>
  )
}

export default App