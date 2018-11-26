'use strict';

const logger = require('../utils/logger');

const playlistCollection = require('../models/playlist-store.js');
const playlistStore = require('../models/playlist-store');
const uuid = require('uuid');

const dashboard = {
    index(request, response) {
        logger.info('dashboard rendering');
        const viewData = {
            title: 'Playlist Dashboard',
            playlists: playlistStore.getAllPlaylists(),
        };
        logger.info('about to render', playlistStore.getAllPlaylists());
        response.render('dashboard', viewData);
    },
   deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect('/dashboard');
  },
  addPlaylist(request, response) {
    const newPlayList = {
      id: uuid(),
      title: request.body.title,
      songs: [],
    };
    logger.debug('Creating a new Playlist', newPlayList);
    playlistStore.addPlaylist(newPlayList);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
