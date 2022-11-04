require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const app = express();
const SpotifyWebApi = require('spotify-web-api-node');


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const spotifyApi = new SpotifyWebApi ({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})
// Our routes go here:

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
