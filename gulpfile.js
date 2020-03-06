var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var pug = require('gulp-pug');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('style', function() {
  return gulp.src('src/sass/style.scss')
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest('src/css'))
  .pipe(server.stream())
});

gulp.task('babel', () =>
    gulp.src('src/app.js')
        .pipe(babel({
          "presets": ["@babel/env", {
            
         }],
        }))
        .pipe(concat('script.js'))
        .pipe(gulp.dest('src/js'))
);

gulp.task('views', function buildHTML() {
  return gulp.src('src/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest("src/"))
});

gulp.task('serve', gulp.series('style', (done) => {
  server.init({
    server: "src/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/sass/**/*.{scss,sass}', gulp.parallel(['style', 'babel']));
  gulp.watch('src/*.pug').on('change', gulp.parallel('views'));
  gulp.watch('src/*.js').on('change', gulp.parallel('babel'));
  gulp.watch('src/*.html').on('change', server.reload);
  gulp.watch('src/css/*.css').on('change', server.reload);
  gulp.watch('src/app.js').on('change', server.reload);
  done();
}));