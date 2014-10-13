// TODO make metalsmith-base.js with shared functionality
//      and specify only dev workflow dependencies below

var Metalsmith = require('metalsmith')
    , markdown = require('metalsmith-markdown')
    , marked = require('marked')
    , renderer = new marked.Renderer()
    , templates = require('metalsmith-templates')
    , jade = require('jade')
    , beautify = require('metalsmith-beautify')
    , assets = require('metalsmith-assets')
    // , permalinks = require('metalsmith-permalinks')
    , ignore = require('metalsmith-ignore')
    , sass = require('metalsmith-sass')
    , autoprefixer = require('metalsmith-autoprefixer')
    , coffee = require('metalsmith-coffee')
    , watch = require('metalsmith-watch')
    ;

// metalsmith-markdown uses marked (npm) to render markup
// which by default adds ids to all <h> tags which we no likey
// so we replace the headline rendering function
renderer.heading = function (text, level) {
  return '<h' + level + '>' + text + '</h' + level + '>';
}

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .use(ignore([
        "**/.DS_Store"
    ]))
    .use(markdown({renderer:renderer}))
    // no luck with this.
    // .use(permalinks({pattern:":title"}))
    .use(templates({
        engine: 'jade',
        directory: './templates'
    }))
    .use(beautify({
        "indent_size": 4,
        "indent_char": " "
    }))
    .use(assets({
        source: './src/assets/img',
        destination: './assets/img'
    }))
    .use(sass({
        outputStyle: "expanded",
        outputDir: "assets/css/"
    }))
    .use(autoprefixer())
    .use(coffee())
    .use(watch({pattern:'**/*'}))//, livereload:true}))
    .build()


// ---- BOTH ----
// Markdown
// Assets
// Autoprefixer
// SASS
// Coffee
// - Permalinks
// Templates
// - JSON


// ---- DEVELOPMENT SERVER ----
// Beautifier
// Watch


// ---- PRODUCTION BUILD ----
// - Build Date
// - Clean CSS
// - Concat
// - Gzip
// - HTML Minifier
// - Ignore
// - Uglify
