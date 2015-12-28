var ajax = require('component-ajax');

var music = {
    init: function () {
        console.log('page-music.js init');
        this.loadBands();
    },

    loadBands: function () {
        ajax.getJSON('/data/music.json', this.onBandsLoaded.bind(this));
    },

    onBandsLoaded: function (data) {
        console.log('onBandsLoaded', data);
    }
};

module.exports = music;
