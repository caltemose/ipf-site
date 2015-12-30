var ajax = require('component-ajax');

var music = {
    init: function () {
        console.log('page-music.js init');
    },

    loadBands: function () {
        ajax.getJSON('/data/music.json', this.onBandsLoaded.bind(this));
    }
};

module.exports = music;
