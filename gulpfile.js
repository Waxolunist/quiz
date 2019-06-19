const { src, dest } = require('gulp');
const htmltojson = require('gulp-html-to-json');

function htmlToJson(cb) {
    return src('templates/*.tpl')
        .pipe(htmltojson({
            filename: "questions-html",
            useAsVariable: false,
            isAngularTemplate: false
        }))
        .pipe(dest('assets/.'));
}

exports.default = htmlToJson