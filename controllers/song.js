'use strict';

const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store');
const uuid = require('uuid');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectURI : 'http://localhost:4000/callback'
});

const song = {
  index(request, response) {
    const playlistId = request.params.id;
    const songTitle = request.params.title;
    logger.debug('Song ID = ', songTitle);
    const viewData = {
      title: 'Song',
      song: playlistStore.getSong(songTitle),
    };
    response.render('song', viewData);
  },
/*  index(request, response){
    // Search for a track!
  const songId = request.params.id;

  var track =(song.title);
  

  spotifyApi.searchTracks(track, {limit: 1})
    .then(function(data) {
    
      // Send the first (only) track object
      response.send(data.body.tracks.items[0]);
    
    }, function(err) {
        logger.error(err);
    });
    response.redirect('/viewsong' + songId);

  },*/
  viewArtist(request, response){
    
    var artist = (song.artist);
    
     //spotifyApi.getArtist(artist)
  spotifyApi.getArtist('https://api.spotify.com/v1/search?query='+artist+'&type=artist')
    
    .then(function(data) {
    
      // Send the list of tracks
      response.send(data.body);
    
    }, function(err) {
      console.error(err);
    });
    response.redirect('/viewartist' + song);
  }
};

module.exports = song;