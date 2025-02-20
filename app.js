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
spotifyApi.clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));
// Our routes go here:

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/artist-search',(req, res) => {
    spotifyApi.searchArtists(req.query.artist)
    // .then(data => res.render('artist-search-results', {searchedArtist: data.body.artists}))
    // .catch(err => console.log(err))
    .then(data => res.render('artist-search-results', {searchedArtist: data.body.artists.items}))
    .catch(err => console.log(err));
})

app.get('/artist=:id/albums/',(req, res) => {
    spotifyApi.getArtistAlbums(req.params.id)
   .then(artistAlbums => {res.render('albums', {albums: artistAlbums.body.items})})
   .catch(err => console.log(err));
})

app.get('/albums/:id/tracks',(req, res) => {
    spotifyApi.getAlbumTracks(req.params.id)
   .then(albumTracks => {res.render('tracks', {tracks: albumTracks.body.items})})
   .catch(err => console.log(err));
})





app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
