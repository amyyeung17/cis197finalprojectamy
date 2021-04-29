import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

import s from 'styled-components'

import {
  BrowserRouter as Router, Switch, Route, Link, useHistory,
} from 'react-router-dom'


import { MAIN_GREEN , AVENIR, SIZE_FONT, 
  BUTTON_HEIGHT, BUTTON_WIDTH, RADIUS, MAIN_ORANGE, MAIN_GRAY} from '../constants/colors'
import { SIGNUP_ROUTE, WELCOME_ROUTE, HOME_ROUTE } from '../constants/route'

import axios from 'axios'
import { set } from 'mongoose'
import { windows } from 'is'

const Organize = s.div`
  display: flex;
  height: 100%
`

const Side = s.div`
  background-color: ${ MAIN_GREEN };
  width: 50%;
  height: 850px;
  left: 0px;
  top: 0px;
  margin: -10px;
  padding: 0px;
  z-index: 10
`
const Main1 = s.h1`
  font-family: ${ AVENIR };
  font-size: 100px;
  color: white;
  margin-top: 350px;
  margin-left: 25px;
  justify-content: flex-start;
`
const Input = s.input`
  width: 500px; 
  height: 50px; 
  z-index: 1;
  font-size: 36px;
  font-family: ${AVENIR};
  border-radius: 3px; 
  padding:0px;
  margin-bottom: 50px;
`

const Texts2 = s.h5`
  font-family: ${ AVENIR };
  color: ${ MAIN_GRAY};
  font-size: 24px;
  z-index: 5;
  margin-top: 50px;
  margin-left: 10px
`

const ButtonAgain = s.button`
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


const SpotifyAdd = () => {
  const [state, setState] = useState('')
  const [client_id, setClient] = useState('')
  const [client_secret, setSecret] = useState('')
  const [link, setLink] = useState('')
  const [a, setA] = useState(false)
  const history = useHistory()

  useEffect (async() => {
    if (state == 'signup') {
      history.push(SIGNUP_ROUTE)
    }
    if (state == 'welcome') {
      history.push(WELCOME_ROUTE)
    } 
    if (state == 'loggedin' ) {
      setState('link')
      //history.push(HOME_ROUTE)
    }
  }, [state])

  const trylog = async () => {
    const { username } = await axios.get('/profile/')
    const { status, data } = await axios.get('/spotify/get')
    setLink(data)
    if (status == 200) {
      setA(!a)
    } else {
      window.alert('failed to log in!')
    }
  }
  

  return(
    <>
      <Organize>
        <Side>
          <Main1> Add your spotify here: </Main1>
        </ Side>
          <ButtonAgain style={{position: 'absolute', marginLeft:'925px', top: '525px'}} 
          onClick={() => trylog()} >
            Login
            </ButtonAgain>
          <Texts2 style={{position:'absolute', left:'825px', top: '205px'}}> Client ID: </Texts2>
          <Input style={{position: 'absolute', left: '825px', top: '300px'}} onChange={e => setClient(e.target.value)}/>
          <Texts2 style={{position:'absolute', left:'825px', top: '330px'}}>  Client Secret: </Texts2>
          <Input style={{position: 'absolute', left: '825px', top: '425px'}} onChange={e => setSecret(e.target.value)}/>
          <Router>
        </Router>
        { a ? 
            <Texts2 style={{position:'absolute', left:'930px', top: '600px'}}> 
              <ButtonAgain onClick={() => window.open(link, '_blank')}>You can now authorize here! </ButtonAgain>
            </Texts2>
           : null}
         <Router>
              <Texts2 style={{position:'absolute', left:'930px', top: '685px'}}> 
                <Link to='/signup' onClick={() => setState('welcome')}> Back to the welcome page </Link>
              </Texts2>
          </Router>
      </ Organize>
    </>
  )
}
export default SpotifyAdd