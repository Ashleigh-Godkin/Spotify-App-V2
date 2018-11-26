'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const fetch = require('node-fetch');

const app = express();
app.use(cookieParser());
const exphbs = require('express-handlebars');
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.static('public'));
app.use(fileUpload());
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.set('view engine', '.hbs');

const routes = require('./routes');
app.use('/', routes);


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
/*app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});*/

// init Spotify API wrapper

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectURI : 'http://localhost:4000/callback'
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });

 // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
  spotifyApi.refreshAccessToken().then(
    function(data) {
      console.log('The access token has been refreshed!');

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Could not refresh access token', err);
    }
  );

app.get('/login', function(req, res) {
var scopes = 'user-read-private user-read-email';
res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + spotifyApi.clientId +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(spotifyApi.redirectURI));
});

app.get("/search", function (request, response) {
  let query = request.query.query;
  

  spotifyApi.searchTracks(query)
  .then(function(data) {
    response.send(data.body);
  }, function(err) {
    logger.error(err)
  });
});

/*app.get('/search-track', function (request, response) {
  
  // Search for a track!
  var track =('/playlist/:id/song/{{title}}');

  spotifyApi.searchTracks(track, {limit: 1})
    .then(function(data) {
    
      // Send the first (only) track object
      response.send(data.body.tracks.items[0]);
    
    }, function(err) {
        logger.error(err);
    });
});*/

app.get('/artist', function (request, response) {

  var artist =('/playlist/:id/song/{{artist}}');
  // Get information about an artist
 //spotifyApi.getArtist('6oMuImdp5ZcFhWP0ESe6mG')
  spotifyApi.getArtist('https://api.spotify.com/v1/search?query='+artist+'&type=artist')

    .then(function(data) {
    
      // Send the list of tracks
      response.send(data.body);
    
    }, function(err) {
      console.error(err);
    });
  response.redirect('viewartist');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  logger.info('Your app is listening on port ' + listener.address().port);
  
});
