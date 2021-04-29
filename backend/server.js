const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

const app = express()
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
const SpotifyRouter = require('./routes/spotify')
const ProfileRouter = require('./routes/profile')





const http = require('http')

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(1234);





const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finalproject197final'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))
app.use(cookieParser())
app.use(express.json())

app.use(
  cookieSession({
    name: 'session',
    keys: ['secret-code'],
  }),
)
app.get('/', (req, res) => res.send('HELLO'))

app.use('/spotify', SpotifyRouter)
app.use('/profile', ProfileRouter)


const errorHandling = (err, req, res, next) => {
  res.status(500).send(`${err}`)
}
app.use(errorHandling)


app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('listening on 3000')
})