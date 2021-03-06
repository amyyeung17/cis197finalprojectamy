import React, { useState, useEffect } from 'react'

import s from 'styled-components'

import {
  BrowserRouter as Router, Switch, Route, Link, useHistory, useParams
} from 'react-router-dom'


import { MAIN_GREEN , AVENIR, SIZE_FONT, 
  BUTTON_HEIGHT, BUTTON_WIDTH, RADIUS, MAIN_ORANGE, MAIN_GRAY} from '../constants/colors'

import axios from 'axios'
import { FOLLOWING_ROUTE, HOME_ROUTE, PROFILE_ROUTE } from '../constants/route'

const Spotifyadd = s.button`
  width: ${ BUTTON_WIDTH };
  height: ${ BUTTON_HEIGHT };
  font-family: ${ AVENIR }
`
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
  align-items: center;
`
const Banner2 = s.div` 
  display: flex;
  width: 50%;
  height: 75px;
  margin-left: 350px;
  z-index: -5;
  justify-content: space-between;
  align-items: center;
  flow-direction: row;
`

const Divideprofile = s.div`
  display: flex; 
  flex-direction: column;
  width: 35%;
  height: 600px;
  align-items:center;
  z-index: 10;
  border:0px;
`

const Divideprofile1 = s.div`
  display: flex; 
  flex-direction: column;
  width: 65%;
  height: 600px;
  align-items:center;
  z-index: 12;
  border:0px;
`

const Divideprofile2 = s.div`
  display: flex; 
  flex-direction: row;
  width: 100%;
  height: 600px;
  z-index: 10;
  border: 0px;
`

const Divideprofile3 = s.div`
  display: flex; 
  flex-direction: column;
  width: 30%;
  height: 600px;
  z-index: 10;
  border:0px;
`

const Divideprofile4 = s.div`
  display: flex; 
  flex-direction: column;
  width: 100%;
  height: 300px;
  z-index: 10;
  border:0px;
  align-items:center;
  justify-content: space-between;
`
const Divideprofile5 = s.div`
  display: flex; 
  flex-direction: row;
  width: 100%;
  height: 100px;
  z-index: 10;
  border: 0px;
  align-items:center;
  justify-content: space-evenly;
  margin-top:200px;
`

const Input2 = s.input`
  width: 600px; 
  height: 50px; 
  z-index: 15;
  font-size: 36px;
  font-family: ${AVENIR};
  border-radius: 3px; 
  border-color: ${MAIN_ORANGE};
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 15px;
`
const Profilepic = s.div`
  border: solid ${ MAIN_ORANGE };
  width: 300px; 
  height: 300px;
  z-index:3;
  margin-top: 10px
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

const Settings = ({ val }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [edit, setEdit] = useState(false)
  const [state, setState] = useState('')
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [spotifylink, setLink] = useState('')
  const [profilepic , setPicture] = useState('')
  const [artist, setArtist] = useState('')
  const [genre , setGenre] = useState('')
  const [_id, setId] = useState('')
  const [token, setAuthToken] = useState('')
  const history = useHistory()

  const z = useParams()


  useEffect(async () => {
    const { data } = await axios.get(`/profile/${z.username}`)
    if ((data.name !== undefined && data.email !== undefined) && data.username !== undefined) {
      const { username, name, email, description, followers, following, spotifylink, profilepic, artist, genre, _id} = data
      setUsername(username)
      setName(name)
      setEmail(email)
      setDescription(description)
      setFollowers(followers)
      setFollowing(following)
      setLink(spotifylink)
      setPicture(profilepic)
      setArtist(artist)
      setGenre(genre)
      setId(_id)
    }
  }, [])



  useEffect(async () =>{
    if (state == 'home') {
      history.push(HOME_ROUTE)
    }
    if (state == 'follows'){
      history.push(FOLLOWING_ROUTE + `/${username}`)
    }
    if (state == 'profile'){
      history.push(PROFILE_ROUTE + `/${username}`)
    }
    if (state == 'failed') {
      history.push(SETTINGS_ROUTE + `/${username}`)
    }
    if (state == 'logout') {
      history.push(HOME_ROUTE)
    }

  }, [state])

  const update = async () =>{
    const { status } = await axios.post('/profile/update', {username, name, email, artist, genre, profilepic,
      description, spotifylink, _id})

      if(status == 200){
  
        setState('profile')
      } else {
        setState('failed')
      }
  }


  const tryout = async () => {
    const { status } = await axios.post('/profile/logout', { username, password })
    if (status == 200) {
      setState('logout')
    } else {
      window.alert('failed to logout')
    }
  }


  return(
    <>
     <Banner>
        <SecondTitle1> Settings </SecondTitle1>
      </Banner>
      <Banner2>
          <ButtonAgain2 onClick={() => {setState('profile')}}> Profile </ButtonAgain2>
          <ButtonAgain2 onClick={() => setState('follows')}> Friends </ButtonAgain2>
          <ButtonAgain2 onClick={() => setState('home')}> Home </ButtonAgain2>
          <ButtonAgain2 onClick={() => setState('settings')}> Settings </ButtonAgain2>
          <ButtonAgain2 onClick={() => tryout()}> Log out </ButtonAgain2>  
      </Banner2>
    <Divideprofile2 >
    < Divideprofile>
        <Profilepic />
        <Texts4> Name </Texts4>
        <Input2 style={{width:'300px', margin:'-5px'}} value={ name } 
          onChange={e => setName(e.target.value)} />
        <Texts4> Username </Texts4>
        <Input2 style={{width:'300px', margin:'-5px'}} value={ username } 
          onChange={e => setName(e.target.value)} />
    </Divideprofile>
    <Divideprofile3>
      <Divideprofile4 >
        <Texts4> Email: </Texts4>
        <Texts4> Spotify User:</Texts4>
        <Texts4> Profile Pic: </Texts4>
        <Texts4> Description: </Texts4>
        <Texts4> Favorite Artist: </Texts4>
        <Texts4> Favorite Genre: </Texts4>
      </Divideprofile4>
      </Divideprofile3>
    <Divideprofile1>
      <Divideprofile4>
        <Input2 value={ email } onChange={e => setEmail(e.target.value)} />
        <Texts4> Placeholder </Texts4>
        <Input2 value={ profilepic } onChange={e => setPicture(e.target.value)} />
        <Input2 value={ description} onChange={e => setDescription(e.target.value)}/>
        <Input2 value={ artist } onChange={e => setArtist(e.target.value)}/>
        <Input2 value={ genre } onChange={e => setGenre(e.target.value)}/>
        </Divideprofile4>
      </Divideprofile1>
  </Divideprofile2>
  <div style={{marginLeft:'500px', display:'flex', 
    justifyContent:'space-evenly', width:'50%', marginTop:'-25px'}}>
    <ButtonAgain2 
      onClick={() => update()}
      style={{borderColor:`${MAIN_GREEN}`, borderStyle:'solid', borderWidth:'3px'}}> 
      Save
    </ButtonAgain2>
    <ButtonAgain2 style={{borderColor:`${MAIN_GREEN}`, borderStyle:'solid', 
      borderWidth:'3px', width:'300px'}}
      onClick={() => spotify()}> Change Spotify Settings</ButtonAgain2>
  </div>
  
</>
  )
}

export default Settings