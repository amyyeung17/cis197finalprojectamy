const express = require('express')
const request = require('request')
const cors = require('cors')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const SpotifyWebApi = require('spotify-web-api-node')

const router = express.Router() 

const PostSong = require('../models/postsong')
const Spotifyuser = require('../models/spotifyuser')
const { URLSearchParams } = require('url')

const port = process.env.PORT || 3000

const stateKey = 'spotify_auth_state'
const url = ''


const scopes = ['user-follow-read','user-read-recently-played',
 'user-top-read', 'user-library-read', 'user-read-email', 'user-follow-read']

let c = ''
let d = ''
let credentials = ({
  clientId: c,
  clientSecret: d,
  redirectUri: 'http://localhost:3000/spotify/callback'
})

let spotifyApi = new SpotifyWebApi(credentials)

router.get('/get', async (req, res, next) => {
  const { results } = req.body
  console.log(results)
  if (results != undefined) {
    res.send(results)
  }
})

 router.get('/current', async(req, res, next) => {
   PostSong.find({}, (err, songs) => {
     res.send(songs)
   })
 })

 router.post('/update', async(req, res, next) => {
  const { username, songs } = req.body
  console.log(username, songs)
  try{
    await PostSong.create({ username, songs })   
  } catch(err) {
    next(err)
  }
 })

router.post('/logins', async (req, res, next) => {
  c = req.body.client_id
  d = req.body.client_secret
  const { username } = req.session

    try {
      credentials = ({
        clientId: c,
        clientSecret: d,
        redirectUri: 'http://localhost:3000/spotify/callback'
     })
      spotifyApi = new SpotifyWebApi(credentials)
      const url = spotifyApi.createAuthorizeURL(scopes, stateKey)

      req.session.node = spotifyApi

      Spotifyuser.findOne({username}, (err, user) => {
        if (user) {
          const { _id } = user
          Spotifyuser.findOneAndUpdate({ _id },{client_id: c, client_secret: d}, {upsert:true}, (err, user) => {
            if(err) {
              next(err)
            }
          })
        } else {
          next(err)
        }
      })
    res.send(url)
  } catch {
    next(new Error('failed!'))
  }
  
})

router.post('/callback',  async (req, res, next) => {
  const { code } = req.body

  const username = req.session.username


  try {
    const t = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = t.body
    spotifyApi.setAccessToken(access_token)
    spotifyApi.setRefreshToken(refresh_token)
    req.session.access_token = access_token
    
    await Spotifyuser.findOne({username}, (err, user) => {
      if (user) {
        const { _id } = user
        Spotifyuser.findOneAndUpdate({ _id },{refresh_token}, {upsert:true}, (err, user) => {
          if(err) {
            next(err)
          }
        })
      } else {
        next(err)
      }
    })
  res.session.node = spotifyApi
  } catch {
    next(new Error('Could not set the tokens!'))
  }
})


router.post('/refresh_token', async (req, res, next) => {
  const { username } = req.body

  try {
    await Spotifyuser.findOne({username}, (err, user) => {
      if (user) {
        const { client_id, client_secret, refresh_token } = user
        credentials = ({
          clientId: client_id,
          clientSecret: client_secret,
        })
        spotifyApi = new SpotifyWebApi(credentials)
        spotifyApi.setRefreshToken(refresh_token)
      } else {
        next(err)
      }
    })
    

    const x = await spotifyApi.refreshAccessToken()
    const { access_token, refresh_token } = x.body
    spotifyApi.setAccessToken(access_token)
    req.session.access_token = access_token
    req.session.node = spotifyApi
    res.send('success!')
  } catch (err) {
    next(err)
  }
})

router.post('/search', async (req, res, next) => {

  const { username, search, choice } = req.body
  req.session.results = ''
  console.log(choice)
  try {
    await Spotifyuser.findOne({username}, (err, user) => {
      if (user) {
        const { client_id, client_secret, refresh_token} = user
        credentials = ({
          clientId: client_id,
          clientSecret: client_secret,
        })
        spotifyApi = new SpotifyWebApi(credentials)
        spotifyApi.setAccessToken(req.session.access_token)
      }
    })

    if (choice === 'Search') {
      const x = await spotifyApi.searchTracks(search, {limit : 30})
      res.send(x.body.tracks.items)
    }

    if (choice === 'Artists') {
      const y = await spotifyApi.searchArtists(search, {limit: 30})
      res.send(y.body.artists.items)
    }

    if (choice === 'New Releases') {
      const z = await spotifyApi.getNewReleases({limit : 30, country: 'US'})
      res.send(z.body.albums.items)
    }

  } catch (err) {
    console.log(err)
    next(new Error('could not display'))
  }
})

module.exports = router