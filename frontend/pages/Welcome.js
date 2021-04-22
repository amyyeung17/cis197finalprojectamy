import React, { useState, useEffect } from 'react'

import ReactFullpage from '@fullpage/react-fullpage'

import s from 'styled-components'
import {
  BrowserRouter as Router, Switch, Route, Link, useHistory, useParams,
} from 'react-router-dom'


import { MAIN_GREEN , AVENIR, SIZE_FONT, 
  BUTTON_HEIGHT, BUTTON_WIDTH, RADIUS, MAIN_ORANGE, MAIN_GRAY} from '../constants/colors'



const Background = s.div`
  display: flex;
  background-color: ${ MAIN_GREEN };
  width:100%;
  height: 100%;
  z-index: -3
  margin-top: 0px;
  justify-content: center;
  align-items: center;
  flex-direction: column
`
const Main = s.h1`
  font-family: ${ AVENIR };
  font-size: 56px;
  color: white;
`

const Loginbutton = s.button`
  width: ${ BUTTON_WIDTH }; 
  height: ${ BUTTON_HEIGHT }; 
  z-index: 1;
  font-size: ${ SIZE_FONT };
  font-family: ${ AVENIR };
  border-radius: ${ RADIUS }; 
  margin-bottom: 25px;
  margin-top: 25px
`

const Arrow =s.div`
  border: solid white;
  border-width: 0 7px 7px 0;
  padding: 10px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  z-index: 3;
`
const Divide = s.div`
  width: 100%;
  height:100px
`
const Divide2 = s.div`
  display:flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;
  z-index: -1; 

`
const Box = s.div`
  border: solid ${ MAIN_ORANGE };
  width: 500px; 
  height: 500px;
  display: flex;
  z-index:3;
  flex-direction: column;
`
const SecondTitle = s.h3`
  font-family: ${ AVENIR };
  color: ${ MAIN_GREEN};
  font-size: 48px;
  font-weight: 450; 
  z-index: 5;
  margin-left: 10px;
`

const Texts = s.h5`
  font-family: ${ AVENIR };
  color: ${ MAIN_GRAY};
  font-size: 28px;
  z-index: 5;
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 15px;
`

const Welcome = () => {
  const [state, setState] = useState('')
  const history = useHistory()

  useEffect (async() => {
    if (state == 'signup') {
      history.push('/signup')
    } if (state == 'login') {
      history.push('/login')
    }
  }, [state])
  return(
      <>
        <ReactFullpage
        //fullpage options
          licenseKey = {'YOUR_KEY_HERE'}
          scrollingSpeed = {1000} /* Options here */

          render={({ state, fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <div className="section">
                  <Background>
                    <Main>Spotify + Homies </Main>
                    <Loginbutton onClick={() => setState('login')}>
                      Login
                    </Loginbutton>
                    <Loginbutton onClick={() => setState('signup')}>
                      Create an account
                    </Loginbutton>
                    <Divide />
                    <Arrow />
                  </Background>
                </div>
              <div className="section">
                <Divide2>
                  <Box >
                    <SecondTitle>Let's be friends</SecondTitle>
                    <Texts> Discover new music and friends with the help of the Spotify API.</Texts>
                    <Texts> All you need is to have an account which can be signed up for free.</Texts>
                    <p style={{color:`${MAIN_GREEN}`, fontSize:'20px', fontFamily:`${AVENIR}`, marginLeft:'10px', marginTop:'50px'}}>
                      Amy Yeung - CIS 197 Final Project </p>
                  </ Box>
                </Divide2>
              </div>
            </ReactFullpage.Wrapper>
          )
        }}
      />

      </>
  )
}

export default Welcome 