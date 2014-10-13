var Metalsmith = require('metalsmith')
    , markdown = require('metalsmith-markdown')
    , marked = require('marked')
    , renderer = new marked.Renderer()
    , templates = require('metalsmith-templates')
    , jade = require('jade')
    , assets = require('metalsmith-assets')
    , date = require('metalsmith-build-date')
    // , permalinks = require('metalsmith-permalinks')
    , ignore = require('metalsmith-ignore')
    , sass = require('metalsmith-sass')
    , autoprefixer = require('metalsmith-autoprefixer')
    , coffee = require('metalsmith-coffee')
    , uglify = require('metalsmith-uglify')
    , minify = require('metalsmith-html-minifier')
    ;

// metalsmith-markdown uses marked (npm) to render markup
// which by default adds ids to all <h> tags which we no likey
// so we replace the headline rendering function
renderer.heading = function (text, level) {
  return '<h' + level + '>' + text + '</h' + level + '>';
}

Metalsmith(__dirname)
    .source('./src')
    .destination('./prod')
    .use(ignore([
        "**/.DS_Store"
    ]))
    .use(date())
    .use(markdown({renderer:renderer}))
    // no luck with this.
    // .use(permalinks({pattern:":title"}))
    .use(templates({
        engine: 'jade',
        directory: './templates'
    }))
    .use(assets({
        source: './src/assets/img',
        destination: './assets/img'
    }))
    .use(sass({
        outputStyle: "compressed",
        outputDir: "assets/css/"
    }))
    .use(autoprefixer())
    .use(coffee())
    .use(uglify())
    .use(minify({
        removeComments: false,
        removeAttributeQuotes: false
    }))
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
// Build Date
// - Concat
// - Gzip
// HTML Minifier
// - Ignore
// - Uglify




