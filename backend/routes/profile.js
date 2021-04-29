const express = require('express')
const request = require('request')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')

const PostSong = require('../models/postsong')
const Spotifyuser= require('../models/spotifyuser')
const router = express.Router() 


router.get('/', async (req, res, next) => {
  const {username, access_token} = req.session
  if (username != undefined) {
    res.send({username, access_token})
  } else {
    next(new Error('undefined'))
  }
})


router.get('/:username', (req, res, next) => {
  const { username } = req.params
  Spotifyuser.findOne({ username }, (err, user) => {
    if (user) {
      res.send(user)
    } else {
      next(new Error('failed to load profile'))
    }
  })
})

router.get('/finds', (req, res, next) => {
  console.log('why')
  console.log(req.body)
  const { user } = req.body
  const username = user
  try {
  Spotifyuser.findOne({ username }, (err, u) => {
    if (u) {
      res.send(u)
    } else {
      next(err)
    }
  })
} catch (err) {
  console.log(err)
  next(err)
}
})

router.post('/update', async (req, res, next) => {
  const { username, name, email, artist, genre, profilepic,
     description, spotifylink, _id } = req.body
  try {
    await Spotifyuser.findOneAndUpdate({ _id }, { username, name, email, artist, genre, profilepic,
      description, spotifylink, _id },  {upsert: true})
      res.send('updated!')
  } catch {
    next(new Error('uh oh! couldnt update, database error!'))
  }
})

router.post('/loggedin', (req, res, next) => {
  const { username, password } = req.body

  Spotifyuser.findOne({ username, password }, (err, user) => {
    if (user) {
    
      const { name, email } = user
      req.session.username = username
      req.session.password = password
      req.session.name = name
      req.session.email = email 
      res.send('success')
    } else {
      next(new Error('failed to log in'))
    }
  })
})

  router.post('/logout', (req, res, next) => {
    req.session.username = ''
    req.session.password = ''
    req.session.email = ''
    req.session.name = ''
    req.session.client_id = ''
    req.session.client_secret =''
    res.send('done!')
 
  })

router.post('/signup', async (req, res, next) => {
  const { username, password, name, email } = req.body
  const profilepic = ''
  const description = ''
  const genre = ''
  const artist = ''
  const spotifylink =''
  const client_id = ''
  const client_secret = ''
  const refresh_token =''
  
  try {
    await Spotifyuser.create({ username, password, name, 
      email, profilepic, description, genre, artist, spotifylink, client_id, client_secret, refresh_token})
    await PostSong.create({ username })
    req.session.username = username
    req.session.password = password
    req.session.name = name
    req.session.email = email 
    req.session.profilepic = ''
    req.session.description = ''
    req.session.spotifylink = ''
    req.session.artist = ''
    req.session.genre = ''
    req.session.refresh_token =''
    
    res.send(`user was created successfully! welcome ${username}`)

  } catch (error) {
    next(new Error(`failed to create an account!`))
  }
})

module.exports = router

