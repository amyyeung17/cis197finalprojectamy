const { Schema, model } = require('mongoose')

const postsongSchema = new Schema({ 
  username: { type: String, required: true},
  songs: [],
})

module.exports = model('PostSong', postsongSchema)