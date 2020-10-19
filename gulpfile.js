const gulp = require('gulp')
const run = require('gulp-run')

gulp.task('build', () => {
  return run('npm run-script build').exec()
})

gulp.task('watch', () => {
  gulp.watch("src/**/*.ts", gulp.series("build"))
})