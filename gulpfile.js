var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({ lazy: true });
var del = require('del');



gulp.task('help', $.taskListing);

gulp.task('default', ['optimize']);


gulp.task('images', ['clean-images'], function () {
    log('Optimizing images');
    return gulp
        .src(config.images)
        .pipe($.imagemin({ optimizationLevel: 3 }))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean-images', function (done) {
    var files = config.build + 'img/**/*.*';
    clean(files, done);
});


gulp.task('clean', function (done) {
    var delconfig = [].concat(config.build);
    log('cleaning: ' + $.util.colors.blue(delconfig));
    clean(delconfig, done);
});

gulp.task('wiredep', function () {
    log('wiere up bower css and js into the ' + config.baseHtml)
    var options = config.getWiredepDefaulOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(gulp.dest(config.sourceDirectory));
});

gulp.task('inject', function () {
    log('wire up the app css and js into the html');
    var injectCssOptions = config.getInjectDefaultCssOptions();
    var injectJsOptions = config.getInjectDefaultJsOptions();
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css), injectCssOptions))
        .pipe($.inject(gulp.src(config.js), injectJsOptions))
        .pipe(gulp.dest(config.sourceDirectory));
});



gulp.task('optimize', ['wiredep', 'inject', 'images'], function () {
    log('Optimazing the assets');
    var assets = $.useref.assets();
    var cssFilter = $.filter('**/*.css');
    var jsFilter = $.filter('**/*.js');

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.build));
});



///////////
function clean(path, done) {
    log('Cleaning ' + $.util.colors.blue(path));
    del(path, done);
};

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
};

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
};

