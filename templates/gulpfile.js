const {src, dest} = require('gulp');
const data = require('gulp-data');
const nunjucks = require('gulp-nunjucks');
const folders = {
    INDEX: 'views/index.html',
    ERROR: 'views/error.html',
    DEST: 'dist',
};

exports.default = function (title) {
    return src(folders.INDEX)
        .pipe(data(() => ({title})))
        .pipe(nunjucks.compile())
        .pipe(dest(folders.DEST));
};

exports.error = function (message, error) {
    return src(folders.ERROR)
        .pipe(data(() => ({message, error})))
        .pipe(nunjucks.compile())
        .pipe(dest(folders.DEST));
};