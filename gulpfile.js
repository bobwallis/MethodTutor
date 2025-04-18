const { src, dest, watch, series, parallel } = require('gulp');
const plumber      = require('gulp-plumber');
const mergeStream  = require('merge-stream');
const streamify    = require('gulp-streamify');
const svgo         = require('gulp-svgo');
const htmlmin      = require('gulp-html-minifier-terser');
const terser       = require('gulp-terser');
const replace      = require('gulp-replace');
const rollup       = require('@rollup/stream');
const source       = require('vinyl-source-stream');
const postcss      = require('gulp-postcss');
const atImport     = require('postcss-import');
const autoprefixer = require('autoprefixer');
const nesting      = require('postcss-nesting');
const csso         = require('postcss-csso');

const DEST = './web/';

// Favicon
async function favicon() {
    return src('src/img/favicon.*')
        .pipe(dest(DEST));
}

// CSS
async function css() {
    return src('src/css/style.css')
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(postcss([
            atImport({
                path: ['src/css']
            }),
            nesting(),
            autoprefixer(),
            csso()
        ]))
        .pipe(dest(DEST));
}

// JS
function js() {
    return rollup({
        input: 'src/js/app.js',
        output: {
            format: 'iife',
            name: 'app'
        }
    })
        .pipe(source('app.js'))
        .pipe(streamify(terser({ keep_fnames: true, mangle: false })))
        .pipe(dest(DEST));
}

async function js_serviceWorker() {
    return src('src/js/service-worker.js')
        .pipe(replace('{{DATE}}', (new Date()).toISOString().substr(0,19).replace(/[-:T]/g,'')))
        .pipe(streamify(terser()))
        .pipe(dest(DEST));
}

// HTML
async function html() {
    return src('src/html/index.html')
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(replace('{{DATE}}', (new Date()).toISOString().substr(0,19).replace(/[-:T]/g,'')))
        .pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
        .pipe(dest(DEST));
}

// Manifest
async function manifest() {
    return src('src/manifest/manifest.json')
        .pipe(dest(DEST));
}

// Images
async function img() {
    const svgStream = src(['src/img/*.svg'])
        .pipe(svgo())
        .pipe(dest(DEST));

    const pngStream = src(['src/img/*.png'])
        .pipe(dest(DEST));

    const icoStream = src(['src/img/*.ico'])
        .pipe(dest(DEST));

    return mergeStream(svgStream, pngStream, icoStream);
}

// Watcher
function watchFiles(cb) {
    watch('src/**/*.css', css);
    watch('src/**/*.html', html);
    watch('src/**/*.js', parallel(js, js_serviceWorker));
    watch('src/manifest/*', manifest);
    cb();
}

// Export tasks
exports.css = css;
exports.html = html;
exports.js = js;
exports.watch = watchFiles;
exports.build = parallel(css, html, js, js_serviceWorker, img, favicon, manifest);
exports.default = exports.build;
