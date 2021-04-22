const { Schema, model } = require('mongoose')

const postsongSchema = new Schema({ 
  username: { type: String, required: true},
  artists: [],
  genre: [], 
  albums: [],
  recommended: [],
  songs: [],
})

module.exports = model('PostSong', postsongSchema)