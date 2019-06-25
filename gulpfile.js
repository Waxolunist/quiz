const { src, dest, series } = require('gulp');
const del = require('del');
const htmltojson = require('gulp-html-to-json');
const ghPages = require('gulp-gh-pages');
var exec = require('child_process').exec;

const paths = {
    build: './build/',
    assets: './assets/',
};
paths.buildname = paths.build + './es6-bundled/';

function cleanBuild(cb) {
    return del(paths.build);
}

function htmlToJson(cb) {
    return src('templates/*.tpl')
        .pipe(htmltojson({
            filename: "questions-html",
            useAsVariable: false,
            isAngularTemplate: false
        }))
        .pipe(dest(paths.assets));
}

function polymer(cb) {
    exec('node ./node_modules/polymer-cli/bin/polymer.js build', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

function afterBuild(cb) {
    let qrScannerWorkerDir = './node_modules/qr-scanner/';
    let qrScannerWorkerFile = 'qr-scanner-worker.min.js';
    return src(qrScannerWorkerDir + qrScannerWorkerFile).pipe(dest(paths.buildname + qrScannerWorkerDir));
}

function ghPagesTask(cb) {
    return src([paths.buildname + '**/*', paths.buildname + '.nojekyll'])
        .pipe(ghPages());
}

exports.assets = htmlToJson;
exports.afterbuild = afterBuild;
exports.build = series(cleanBuild, htmlToJson, polymer, afterBuild);
exports.deploy = series(exports.build, ghPagesTask);
exports.default = exports.build;