import React, { useState, useEffect } from 'react'

import s from 'styled-components'

import {
  BrowserRouter as Router, Switch, Route, Link, useHistory, useParams
} from 'react-router-dom'


import { MAIN_GREEN , AVENIR, SIZE_FONT, 
  BUTTON_HEIGHT, BUTTON_WIDTH, RADIUS, MAIN_ORANGE, MAIN_GRAY} from '../constants/colors'

import { HOME_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE, WELCOME_ROUTE } from '../constants/route'

import axios from 'axios'

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
  align-items: center
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
const Profilepic = s.button`
  border: solid ${ MAIN_ORANGE };
  width: 400px; 
  height: 400px;
  margin-bottom: 20px;
  justify-content: center;
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

const Box = s.div`
  border: solid ${ MAIN_ORANGE };
  width: 500px; 
  height: 500px;
  display: flex;
  z-index:3;
  flex-direction: column;
`

const Banner3 = s.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-evenly;
  flow-direction: row;
`

const Follow = () => {
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
  const [user , setUser] = useState('')
  const [results, setResults] = useState([])
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

  useEffect(() => {
    const intervalID = setInterval(() => {
      const actual = []
      const showsongs = async () => {
        const { data } = await axios.get('/spotify/current')
        data.forEach(i => {
          actual.push(i)
        })
        setResults(actual)
      }
      showsongs()
    }, 2000)

    return () => clearInterval(intervalID)
  }, [])

  useEffect(async () =>{
    if(state == 'home') {
      history.push(HOME_ROUTE)
    }
    if(state == 'profile') {
      history.push(PROFILE_ROUTE + `/${username}`)
    }
    if (state == 'settings') {
      history.push(SETTINGS_ROUTE + `/${username}`)
    }

    if (state == 'go') {
      history.push(PROFILE_ROUTE + `/${user}`)
    }

    if (state == 'logout') {
      history.push(WELCOME_ROUTE)
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



  return(
    <>
     <Banner>
        <SecondTitle1> Follows </SecondTitle1>
      </Banner>
      <Banner2>
          <ButtonAgain2 onClick={() => setState('profile')}> Profile </ButtonAgain2>
          <ButtonAgain2 onClick={() => setState('follows')}> Friends </ButtonAgain2>
          <ButtonAgain2 onClick={() => setState('home')}> Home </ButtonAgain2>
          <ButtonAgain2 onClick={() => setState('settings')}> Settings </ButtonAgain2>
          <ButtonAgain2 onClick={() => tryout()}> Log out </ButtonAgain2>  
      </Banner2>

    <Banner3>
        {results.map((r, index) => {
          {console.log(r.username)}
           return(  
            <> 
              <Profilepic style={{alignContent: 'space-evenly', flexWrap: 'wrap', flexBasis:'auto'}}
              onClick={() => {setUser(r.username); setState('go')}}>
                <SecondTitle1 key={index.uniqueId} style={{fontSize:32}}> {r.songs[0].name}</SecondTitle1> 
                  
                  {(r.songs[0].artists != undefined) ? r.songs[0].artists.map(x => {
                   return(
                      <>
                        <SecondTitle1 key={index.uniqueId} style={{fontSize:20, marginTop:'3px'}}> {x.name}</SecondTitle1> 
                      </>
                   )}): null}
                   {(r.songs[0].genres != undefined) ?
                          <>
                            <SecondTitle1 key={index.uniqueId} style={{fontSize:20}}> {r.songs[0].genres}</SecondTitle1>
                          </>    
                  : null}
               <SecondTitle1 style={{fontSize:20, marginTop:'10px'}}> Listener: {r.username}</SecondTitle1>
              </Profilepic>
            </>     
           )  
        })}
        </Banner3>
  
</>
  )
}

export default Follow