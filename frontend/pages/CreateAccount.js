import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

import s from 'styled-components'

import {
  BrowserRouter as Router, Switch, Route, Link, useHistory,
} from 'react-router-dom'


import { MAIN_GREEN , AVENIR, SIZE_FONT, 
  BUTTON_HEIGHT, BUTTON_WIDTH, RADIUS, MAIN_ORANGE, MAIN_GRAY} from '../constants/colors'
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SIGNUP_ROUTE, SPOTIFY_ROUTE, WELCOME_ROUTE } from '../constants/route'
import axios from 'axios'
import { set } from 'mongoose'

const Organize1 = s.div`
  display: flex;
  height: 100%
`

const Side1 = s.div`
  background-color: ${ MAIN_GREEN };
  width: 50%;
  height: 850px;
  left: 0px;
  top: 0px;
  margin: -10px;
  padding: 0px;
  z-index: 10
`
const Main2 = s.h1`
  font-family: ${ AVENIR };
  font-size: 100px;
  color: white;
  margin-top: 275px;
  margin-left: 25px;
  justify-content: flex-start;
`
const Input1 = s.input`
  width: 500px; 
  height: 50px; 
  z-index: 1;
  font-size: 36px;
  font-family: ${AVENIR};
  border-radius: 3px; 
  padding:0px;
  margin-bottom: 50px;
`

const Texts3 = s.h5`
  font-family: ${ AVENIR };
  color: ${ MAIN_GRAY};
  font-size: 24px;
  z-index: 5;
  margin-top: 50px;
  margin-left: 10px
`

const ButtonAgain1 = s.button`
  width: ${ BUTTON_WIDTH }; 
  height: ${ BUTTON_HEIGHT }; 
  z-index: 1;
  font-size: ${ SIZE_FONT };
  font-family: ${ AVENIR };
  border-radius: ${ RADIUS }; 
  margin-bottom: 25px;
  margin-top: 25px
  z-index: 3
`



  const CreateAccount = () => {
    const [state, setState] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const history = useHistory()
  
    useEffect (async() => {
      if (state == 'login') {
        history.push(LOGIN_ROUTE)
      }
      if (state == 'welcome') {
        history.push(WELCOME_ROUTE)
      }
      if (state == 'spotify') {
        history.push(SPOTIFY_ROUTE)
      }
      if (state == 'signup') {
        history.push(SIGNUP_ROUTE)
      }
    }, [state])

    const create = async () => {
      const { status } = await axios.post('/profile/signup', { username, password, name, email})
      console.log(status)
      console.log(status)
      if (status == 200) {
        setState('spotify')
      } else {
        setState('signup')
      }
    }
  
    
  
    return(
      <>
        <Organize1>
          <Side1>
            <Main2> Create an Account </Main2>
          </ Side1>
            <ButtonAgain1 style={{position: 'absolute', marginLeft:'925px', top: '600px'}}
            onClick={() => create(username, password, email, name)} >
              Create an Account
              </ButtonAgain1>
            <Texts3 style={{position:'absolute', left:'825px', top: '30px'}}> Name: </Texts3>
            <Input1 style={{position: 'absolute', left: '825px', top: '125px'}} 
            onChange={e => setName(e.target.value)}/>
            <Texts3 style={{position:'absolute', left:'825px', top: '155px'}}>  Username: </Texts3>
            <Input1 style={{position: 'absolute', left: '825px', top: '250px'}}
            onChange={e => setUsername(e.target.value)}/>
            <Texts3 style={{position:'absolute', left:'825px', top: '280px'}}> Password: </Texts3>
            <Input1 style={{position: 'absolute', left: '825px', top: '375px'}}
            onChange={e => setPassword(e.target.value)}/>
            <Texts3 style={{position:'absolute', left:'825px', top: '405px'}}>  Email: </Texts3>
            <Input1 style={{position: 'absolute', left: '825px', top: '500px'}}
            onChange={e => setEmail(e.target.value)}/>
            <Router>
              <Texts3 style={{position:'absolute', left:'865px', top: '630px'}}> Have an account already? Log in
                <Link to={LOGIN_ROUTE} onClick={() => setState('login')}> here! </Link>
              </Texts3>
          </Router>
          <Router>
              <Texts3 style={{position:'absolute', left:'930px', top: '685px'}}> 
                <Link to={WELCOME_ROUTE} onClick={() => setState('welcome')}> Back to the welcome page </Link>
              </Texts3>
          </Router>
        </ Organize1>
      </>
    )
  }

  export default CreateAccount 