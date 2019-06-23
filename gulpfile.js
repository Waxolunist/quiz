const { src, dest, series } = require('gulp');
const del = require('del');
const htmltojson = require('gulp-html-to-json');
const mergeStream = require('merge-stream');
const clean = require('gulp-clean');
const ghPages = require('gulp-gh-pages');


function cleanBuild(cb) {
    return del('build/');
}

function htmlToJson(cb) {
    return src('templates/*.tpl')
        .pipe(htmltojson({
            filename: "questions-html",
            useAsVariable: false,
            isAngularTemplate: false
        }))
        .pipe(dest('assets/.'));
}

function polymer(cb) {
    const PolymerProject = require('polymer-build').PolymerProject;

    const project = new PolymerProject(require('./polymer.json'));

    return mergeStream(project.sources(), project.dependencies())
        .pipe(project.bundler())
        .pipe(project.updateBaseTag('/quiz/'))
        .pipe(project.addPushManifest())
        .pipe(dest('build/'));
}

function serviceworkers(cb) {
    const PolymerProject = require('polymer-build').PolymerProject;
    const generateServiceWorker = require('polymer-build').generateServiceWorker;
    const addServiceWorker = require('polymer-build').addServiceWorker;

    const project = new PolymerProject(require('./polymer.json'));

    return generateServiceWorker({
        buildRoot: 'build/',
        project: project,
        bundled: true, // set if `project.bundler()` was used
        swPrecacheConfig: {
            // See https://github.com/GoogleChrome/sw-precache#options-parameter for all supported options
            navigateFallback: '/index.html',
        }
    });
}

function ghPagesTask(cb) {
    return src('./build/**/*')
        .pipe(ghPages());
}

exports.assets = htmlToJson;
exports.build = series(cleanBuild, htmlToJson, polymer); //, serviceworkers);
exports.deploy = series(exports.build, ghPagesTask);
exports.default = exports.build;