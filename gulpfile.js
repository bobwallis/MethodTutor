var DEST = './web/';

var gulp         = require( 'gulp' );
var plumber      = require( 'gulp-plumber' );
var mergeStream  = require( 'merge-stream' );
var streamify    = require( 'gulp-streamify' );
var svgo         = require( 'gulp-svgo' );
var htmlmin      = require( 'gulp-htmlmin' );
var terser       = require( 'gulp-terser' );
var replace      = require( 'gulp-replace' );
var requirejs    = require( 'gulp-requirejs' );
var amdclean     = require( 'gulp-amdclean' );
var postcss      = require( 'gulp-postcss' );
var atImport     = require( 'postcss-import' );
var autoprefixer = require( 'autoprefixer' );
var nesting      = require( 'postcss-nesting' );
var csso         = require( 'postcss-csso' );

// Favicon
function favicon() {
    return gulp.src( 'src/img/favicon.*' )
        .pipe( gulp.dest( DEST ) );
}

// CSS
function css() {
    return gulp.src( 'src/css/style.css' )
        .pipe( plumber( { errorHandler: function ( err ) {
            console.log(err);
            this.emit('end');
        } } ) )
        .pipe( postcss([
            atImport({
                path: ['src/css']
            }),
            nesting(),
            autoprefixer(),
            csso()
        ]))
        .pipe( gulp.dest( DEST ) );
}

// JS
function js() {
    return requirejs( {
        baseUrl: 'src/js/',
        include: 'app',
        paths: {
            ready:          'lib/ready',
            '$document_on': 'lib/$document_on'
        },
        optimize: 'none',
        out: 'app.js'
    } ).on('error', function( error ) { console.log( error ); } )
        .pipe( amdclean.gulp() )
        .pipe( streamify( terser() ) )
        .pipe( gulp.dest( DEST ) );
}

function js_serviceWorker() {
    return gulp.src( 'src/js/service-worker.js' )
        .pipe( replace('{{DATE}}', (new Date()).toISOString().substr(0,19).replace(/[-:T]/g,'') ) )
        .pipe( streamify( terser() ) )
        .pipe( gulp.dest( DEST ) )
}

// HTML
function html() {
    return gulp.src( 'src/html/index.html' )
        .pipe( plumber( { errorHandler: function ( err ) {
            console.log( err );
            this.emit( 'end' );
            }
        } ) )
        .pipe( replace('{{DATE}}', (new Date()).toISOString().substr(0,19).replace(/[-:T]/g,'') ) )
        .pipe( htmlmin( { removeComments: true, collapseWhitespace: true } ) )
        .pipe( gulp.dest( DEST ) );
}

// Manifest
function manifest() {
    return gulp.src( 'src/manifest/manifest.json' )
        .pipe( gulp.dest( DEST ) );
}

// Images
function img() {
    return mergeStream(
        gulp.src( ['src/img/*.svg'] )
            .pipe( svgo() )
            .pipe( gulp.dest( DEST ) ),
        gulp.src( ['src/img/*.png'] )
            .pipe( gulp.dest( DEST ) ),
        gulp.src( ['src/img/*.ico'] )
            .pipe( gulp.dest( DEST ) )
    );
}

// Watcher
function watch() {
    gulp.watch( ['src/**/*.css'], css );
    gulp.watch( ['src/**/*.html'], html );
    gulp.watch( ['src/**/*.js'], gulp.parallel( js, js_serviceWorker ) );
    gulp.watch( ['src/manifest/*'], manifest );
}

exports.default = gulp.parallel( css, html, js, js_serviceWorker, img, favicon, manifest );
exports.css = css;
exports.html = html;
exports.js = js;
exports.watch = watch;
