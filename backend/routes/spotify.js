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




router.post('/logins', (req, res, next) => {
  const c = req.body.client_id
  const d = req.body.client_secret

    try {
    const credentials = {
      clientId: c,
      clientSecret: d,
      redirectUri: 'http://localhost:3000/callback'
    }
    const spotifyApi = new SpotifyWebApi(credentials)
    const url = spotifyApi.createAuthorizeURL(scopes, stateKey)
   
  
    res.send(url)
  } catch {
    next(new Error('failed!'))
  }
  
})

router.post('/',  async(req, res) => {
  const { code,d} = req.body
  console.log({d})

})

router.get('/refresh_token', (req, res) => {

  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token
      res.send({
        'access_token': access_token
      })
    }
  })
})

module.exports = router