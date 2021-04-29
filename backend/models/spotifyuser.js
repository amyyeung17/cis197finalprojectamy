const { Schema, model } = require('mongoose')

const spotifyuserSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  name: { type: String, required: true}, 
  email: { type: String, required: true},  
  followers: [],
  following: [],
  profilepic: String, 
  description: String, 
  spotifylink: String, 
  genre: String, 
  artist: String,
  client_id: String,
  client_secret: String,
  refresh_token: String, 
})

module.exports = model('Spotifyuser', spotifyuserSchema)