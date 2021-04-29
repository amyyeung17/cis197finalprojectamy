import React, { useState, useEffect } from 'react'

import s from 'styled-components'

import {
  BrowserRouter as Router, Switch, Route, Link, useHistory, useParams
} from 'react-router-dom'


import { MAIN_GREEN , AVENIR, SIZE_FONT, 
  BUTTON_HEIGHT, BUTTON_WIDTH, RADIUS, MAIN_ORANGE, MAIN_GRAY} from '../constants/colors'

import axios from 'axios'
import ReactFullpage from '@fullpage/react-fullpage'
import { FOLLOWING_ROUTE, HOME_ROUTE, SETTINGS_ROUTE } from '../constants/route'

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
  border: 0px;
`

const Divideprofile1 = s.div`
  display: flex; 
  flex-direction: column;
  width: 65%;
  height: 600px;
  align-items:center;
  z-index: 12;
  border: 0px;

`

const Divideprofile2 = s.div`
  display: flex; 
  flex-direction: row;
  width: 100%;
  height: 600px;
  z-index: 10;
  border: 0px
`

const Divideprofile3 = s.div`
  display: flex; 
  flex-direction: column;
  width: 30%;
  height: 600px;
  z-index: 10;
  border: 0px;
`

const Divideprofile4 = s.div`
  display: flex; 
  flex-direction: column;
  width: 100%;
  height: 300px;
  z-index: 10;
  align-items:center;
  border:0px;
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
  margin-bottom: 15px;
  z-index: 5;
`

const Arrow =s.div`
  border: solid white;
  border-width: 0 7px 7px 0;
  padding: 10px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  z-index: 3;
`



const Profile = ({ val }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [edit, setEdit] = useState(false)
  const [state, setState] = useState('')
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [link, setLink] = useState('')
  const [profilepic , setPicture] = useState('')
  const [artist, setArtist] = useState('')
  const [genre , setGenre] = useState('')
  const history = useHistory()

  const z = useParams()


  useEffect(async () => {
    const { data } = await axios.get(`/profile/${z.username}`)
    if ((data.name !== undefined && data.email !== undefined) && data.username !== undefined) {
      const { username, name, email, description, followers, following, spotifylink, profilepic, artist, genre} = data
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
    }
  }, [])

  useEffect(async () =>{
    if (state == 'home') {
      history.push(HOME_ROUTE)
    }
    if (state == 'follows'){
      history.push(FOLLOWING_ROUTE + `/${username}`)
    }
    if (state == 'settings') {
      history.push(SETTINGS_ROUTE + `/${username}`)
    }

  }, [state])

  return(
    <>
  
                <Banner>
                  <SecondTitle1> {name}'s Profile </SecondTitle1>
                </Banner>
                <Banner2 style={{marginLeft:'357px'}}>
                  <ButtonAgain2 onClick={() => setState('profile')}> Profile </ButtonAgain2>
                  <ButtonAgain2 onClick={() => setState('follows')}> Friends </ButtonAgain2>
                  <ButtonAgain2 onClick={() => setState('home')}> Home </ButtonAgain2>
                  <ButtonAgain2 onClick={() => setState('settings')}> Settings </ButtonAgain2>
                  <ButtonAgain2 onClick={() => setState('logout')}> Log out </ButtonAgain2>  
                </Banner2>
                <Divideprofile2 style={{marginLeft:'5px',marginRight:'5px'}} >
                  <Divideprofile>
                    <Profilepic />
                    <Texts4> Name </Texts4>
                    <Texts4 style={{margin:'-5px'}}> { name } </Texts4>
                    <Texts4> Username </Texts4>
                    <Texts4 style={{margin:'-5px'}}> { username} </Texts4>
                </Divideprofile>
                <Divideprofile3>
                  <Divideprofile4 >
                    <Texts4> Email: </Texts4>
                    <Texts4> Spotify User:</Texts4>
                    <Texts4> Description: </Texts4>
                    <Texts4> Favorite Artist: </Texts4>
                    <Texts4> Favorite Genre: </Texts4>
                  </Divideprofile4>
                </Divideprofile3>
                <Divideprofile1>
                  <Divideprofile4>
                    <Texts4> { email } </Texts4>
                    <Texts4> Placeholder </Texts4>
                    <Texts4> { link } </Texts4>
                    <Texts4 style={{fontSize:'28px'}}> { description } </Texts4>
                    <Texts4> { artist } </Texts4>
                    <Texts4> { genre } </Texts4>
                  </Divideprofile4>
                </Divideprofile1>
               </Divideprofile2>

    </>
  )
}

export default Profile