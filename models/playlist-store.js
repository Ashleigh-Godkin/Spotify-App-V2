'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const playlistStore = {
    store: new JsonStore('./models/playlist-store.json', {playlistCollection: [] }),
    collection: 'playlistCollection',

    getAllPlaylists() {
        return this.store.findAll(this.collection);
    },

    getPlaylist(id) {
        return this.store.findOneBy(this.collection, { id: id});
    },
    addPlaylist(playlist) {
    this.store.add(this.collection, playlist);
    this.store.save();
  },

  removePlaylist(id) {
    const playlist = this.getPlaylist(id);
    this.store.remove(this.collection, playlist);
    this.store.save();
  },
  
   addSong(id, song) {
    const playlist = this.getPlaylist(id);
    playlist.songs.push(song);


    this.store.save();
  },

}

module.exports = playlistStore;