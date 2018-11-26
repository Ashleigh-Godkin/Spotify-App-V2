'use strict';

const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store');
const uuid = require('uuid')

const playlist = {
    index(request, response){
        const playlistId = request.params.id;
        logger.debug('Playlist ID = ', playlistId);
        const viewData = {
            title: 'Playlist',
            playlist: playlistStore.getPlaylist(playlistId),
        };
        response.render('playlist', viewData);
    },

};

module.exports = playlist;