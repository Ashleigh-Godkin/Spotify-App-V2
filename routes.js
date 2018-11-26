'use strict';

const express = require('express');
const router = express.Router();
const dashboard = require('./controllers/dashboard.js');
const playlist = require('./controllers/playlist.js');
const song = require('./controllers/song.js');

router.get('/', dashboard.index);
router.get('/dashboard', dashboard.index);
//router.get('/song', song.index);
router.get('/playlist/:id', playlist.index);
router.get('/dashboard/deleteplaylist/:playlistid', dashboard.deletePlaylist);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);

module.exports = router;
