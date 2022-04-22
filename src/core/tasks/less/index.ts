import gulp from 'gulp';
import through2 from 'through2';
import { endsWith } from 'lodash';
import { resolveArgs, getProjectPath } from '../../utils';
import { transformLess } from './transformLess';

export default function less(...args: string[]) {
  const { s: source = getProjectPath('src/*.less'), d: dest = 'dist' } =
    resolveArgs(args);
  return gulp
    .src(source)
    .pipe(
      through2.obj(function (file, encoding, next) {
        if (endsWith(file.path, '.less')) {
          transformLess(file.path)
            .then((css) => {
              file.contents = Buffer.from(css);
              file.path = file.path.replace(/\.less$/, '.css');
              this.push(file);
              next();
            })
            .catch((e) => {
              console.error(e);
            });
        } else {
          next();
        }
      })
    )
    .pipe(gulp.dest(dest));
}
