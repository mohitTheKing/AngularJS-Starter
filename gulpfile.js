
var config = {
  vendor: {
        js: [
            './bower_components/angular/angular.js'
        ]
    }
}




var gulp = require('gulp'),
    connect = require('gulp-connect'),
    seq = require('run-sequence'),
    replace = require('gulp-replace')

/*==========================================
 =            Start a web server            =
 ==========================================*/
gulp.task('serve', function() {
    connect.server({
      root: 'RaxETest',
      port: 8090,
      fallback: 'index.html',
	    livereload: true
    });
});


/*==============================================================
 =            Setup live reloading on source changes            =
 ==============================================================*/
gulp.task('html', function () {
    gulp.src('index.html')
            .pipe(connect.reload());
});


/*=================================================
 =            Inject live reload script           =
 =================================================*/
 /* in order for the livereload (auto-refresh) to work, it requires either:
  1. the livereload chrome extension  
  2. or we need to inject the livereload script
  Here, we are going with the 2nd option. But we do not want the script to be included into the final production code,
  hence we just inject it during gulp execution and hence it just stays for the dev version.
  Note: here 35729 is the port number on which the livereload server is running.
  */
gulp.task('inject', function () {
    var inject = [];

    inject.push('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');
    gulp.src(['index.html'])
            .pipe(replace('<!-- inject-livereload:js -->', inject.join('\n    ')));
});

// gulp.task('injectlibs', function () {
//     var inject = [];

//     inject.push(config.vendor.js[0]);
//     gulp.src(['index.html'])
//             .pipe(replace('<!-- inject-libs:js -->', inject.join('\n    ')));
// });


gulp.task('watch', function(){
    gulp.watch('index.html', ['html'])
});

gulp.task('default', function (done) {
    var tasks = [];
    
    tasks.push('inject');
    //tasks.push('injectlibs');
    tasks.push('serve');
    tasks.push('watch');
    
    seq(tasks, done);
});