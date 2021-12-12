import gulp from 'gulp';
import { MetaData } from '.';
import compile from './tasks/compile';
import buildLess from './tasks/less';

gulp.on('task_start', ({ task, hrDuration }: MetaData) => {
  console.log(task);
});
gulp.task('compile-es', compile('es'));

gulp.task('compile-lib', compile('lib'));

gulp.task('compile', gulp.parallel('compile-es', 'compile-lib'));

gulp.task('compile:less', buildLess({}));