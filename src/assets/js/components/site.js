// var $ = require('jquery');
var pageInits = {};
pageInits.music = require('./page-music.js');

var site = {

    ipf: {},

    page: '',

    init: function () {
        if (window.ipf) {
            // this.ipf = $.extend(true, this.ipf, window.ipf);
            // console.log(this.ipf.page);
            var page = pageInits[window.ipf.page];
            if (page) {
                page.init();
            } else {
                console.log('this page has no required component');
            }
        } else {
            console.log('window.ipf missing');
        }
    }

}

module.exports = site;
