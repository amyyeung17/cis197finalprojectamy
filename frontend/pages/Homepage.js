import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

import s from 'styled-components'

import {
  BrowserRouter as Router, Switch, Route, Link, useHistory, useParams
} from 'react-router-dom'


import { MAIN_GREEN , AVENIR, SIZE_FONT, 
  BUTTON_HEIGHT, BUTTON_WIDTH, RADIUS, MAIN_ORANGE, MAIN_GRAY} from '../constants/colors'
import { FOLLOWING_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE, SIGNUP_ROUTE, WELCOME_ROUTE } from '../constants/route'
import axios from 'axios'
import { set } from 'mongoose'

import Profile from './Profile'

const ButtonAgain2 = s.button`
  width: 150px; 
  height: ${ BUTTON_HEIGHT }; 
  z-index: 1;
  font-size: ${ SIZE_FONT };
  font-family: ${ AVENIR };
  border-radius: ${ RADIUS }; 
  z-index: 5;
  background-color: white;
  color: ${MAIN_GREEN};
  border-width: 0px;
`
const SecondTitle1 = s.h3` 
  font-family: ${ AVENIR };
  color: ${ MAIN_GREEN};
  font-size: 48px;
  font-weight: 450; 
  z-index: 5;
  margin-left: 10px;
`
const Banner = s.div` 
  display: flex;
  width: 100%;
  height: 75px;
  z-index: -5;
  border: 0px;
  justify-content: center;
  align-items: center
`
const Banner2 = s.div` 
  display: flex;
  width: 50%;
  height: 75px;
  margin-left: 350px;
  z-index: -5;
  justify-content: center;
  align-items: center;
  flow-direction: row;
`
const Banner3 = s.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-evenly;
  flow-direction: row;
`

const Divideprofile = s.div`
  display: flex; 
  flex-direction: column;
  width: 35%;
  height: 600px;
  align-items:center;
  z-index: -2;
  border: solid 1px black;
`

const Divideprofile1 = s.div`
  display: flex; 
  flex-direction: column;
  width: 65%;
  height: 600px;
  align-items:center;
  z-index: -2;
  border: solid 1px black;
`

const Divideprofile2 = s.div`
  display: flex; 
  flex-direction: row;
  width: 100%;
  height: 600px;
  z-index: -5;
  border: solid 1px black;
`

const Divideprofile3 = s.div`
  display: flex; 
  flex-direction: column;
  width: 30%;
  height: 600px;
  z-index: -2;
  border: solid 1px black;
`

const Divideprofile4 = s.div`
  display: flex; 
  flex-direction: column;
  width: 100%;
  height: 300px;
  z-index: -1;
  border: solid 1px black;
  align-items:center;
  justify-content: space-between;
`

const Input2 = s.input`
  width: 600px; 
  height: 50px; 
  z-index: 1;
  font-size: 36px;
  font-family: ${AVENIR};
  border-radius: 3px; 
  padding:0px;
  border-color: ${MAIN_ORANGE};
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 15px;
`
const Texts4 = s.h3`
  font-family: ${ AVENIR };
  color: ${ MAIN_GRAY};
  font-size: 36px;
  z-index: 5;
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 20px;
`

const Profilepic = s.button`
  border: solid ${ MAIN_ORANGE };
  width: 400px; 
  height: 400px;
  margin-bottom: 20px;
  justify-content: center;
`
const Homepage = ({s}) => {
  const [state, setState] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [search, setSearch] = useState('')
  const [choice, setChoice] = useState('')
  const [results, setResults] = useState([])
  const [songs, setSong] = useState([])
  const history = useHistory()


  useEffect(async () => { 
      const { data } = await axios.get(`/profile/`)
      setUsername(data.username)
      if(data.access_token == undefined) {
        const node = data.spotifyApi
        const location = window.location.search
        const p = new URLSearchParams(location)
        const code = p.get('code')
        const params = await axios.post('/spotify/callback', { code, username})
      }
  }, [])

  
  useEffect(async () => {
    if (state == 'profile') {
      history.push(PROFILE_ROUTE + `/${username}`)
    }
    if (state == 'follows') {
      history.push(FOLLOWING_ROUTE + `/${username}`)
    }

    if (state == 'logout') {
      history.push(WELCOME_ROUTE)
    }

    if (state == 'home') {
      history.push(HOME_ROUTE)
    }
    if (state == 'settings') {
      history.push(SETTINGS_ROUTE + `/${username}`)
    }
  }, [state])

  const tryout = async () => {
    const { status } = await axios.post('/profile/logout', { username, password })
    if (status == 200) {
      setState('logout')
    } else {
      window.alert('failed to logout')
    }
  }

  const searcha = async () => {
    const {status, data} = await axios.post('/spotify/search', { username, search, choice })
    const r = []
    const l = []
    data.forEach(i => {
      r.push(i)
    })
    setResults(r)
    setState('')
  }

  const update = async () => {
    const { status } = await axios.post('/spotify/update', { username, songs })
    if (status == 200) {
      console.log('updated!')
    } else {
      window.alert('failed to logout')
    }
  }




  return (
    <>
      <Banner>
        <SecondTitle1> Welcome back {username} </SecondTitle1>
      </Banner>
      <Banner2>
          <ButtonAgain2 onClick={() => {setState('profile')}}> Profile </ButtonAgain2>
          <ButtonAgain2 onClick={() => setState('follows')}> Friends </ButtonAgain2>
          <ButtonAgain2 onClick={() => setState('home')}> Home </ButtonAgain2>
          <ButtonAgain2 onClick={() => setState('settings')}> Settings </ButtonAgain2>
          <ButtonAgain2 onClick={() => tryout()}> Log out </ButtonAgain2>  
      </Banner2>
      <Banner style={{marginLeft:'-10px'}}>
        <Input2 value={search} onChange={e => setSearch(e.target.value)} style={{borderColor:MAIN_GREEN, width:'600px'}} /> 
      </Banner>
      <Banner2>
          <ButtonAgain2 onClick={() => {}}> Search: </ButtonAgain2>
          <ButtonAgain2 onClick={() => {setChoice('Search'); searcha()}}>  All </ButtonAgain2>
          <ButtonAgain2 onClick={() => {setChoice('Artists'); searcha()}}> Artists </ButtonAgain2> 
          <ButtonAgain2 onClick={() => {setChoice('New Releases'); searcha()}}> Popular </ButtonAgain2>
          
      </Banner2>

      <Banner3>
        {results.map((r, index) => {
           return(  
            <> 
              <Profilepic style={{alignContent: 'space-evenly', flexWrap: 'wrap', flexBasis:'auto'}}
              onClick={() => {setSong(r); update()}}>
                <SecondTitle1 key={index.uniqueId} style={{fontSize:32}}> {r.name}</SecondTitle1> 
                  
                  {(r.artists != undefined) ? r.artists.map(x => {
                   return(
                      <>
                        <SecondTitle1 key={index.uniqueId} style={{fontSize:20, marginTop:'3px'}}> {x.name}</SecondTitle1> 
                      </>
                   )}): null}
                   {(r.genres != undefined) ?
                          <>
                            <SecondTitle1 key={index.uniqueId} style={{fontSize:20}}> {r.genres}</SecondTitle1>
                          </>    
                  : null}

              </Profilepic>
            </>     
           )  
        })}
        </Banner3>
    
  

    
        

    


      
    </>
  )
}

export default Homepage 