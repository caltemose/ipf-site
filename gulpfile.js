var requireDir = require('require-dir');

global.gulp = require('gulp');
global.config = require('./config.json');

requireDir('./gulp/tasks', {recurse: true});
requireDir('./gulp/jobs', {recurse: true});
