import gulp from 'gulp';
import through2 from 'through2';
import { transformLess } from './transformLess';

interface Options {
  sourceDir: string | string[];
  outDir: string;
}
export default function ({ sourceDir = '', outDir = '' }: Partial<Options>) {
  return () => {
    console.log(sourceDir);

    return gulp
      .src(sourceDir)
      .pipe(
        through2.obj(function (file, encoding, next) {
          if (
            file.path.match(/(\/|\\)style(\/|\\)index\.less$/) ||
            file.path.match(/(\/|\\)style(\/|\\)v2-compatible-reset\.less$/)
          ) {
            // transformLess(file.path)
            //   .then((css) => {
            //     file.contents = Buffer.from(css);
            //     file.path = file.path.replace(/\.less$/, '.css');
            //     this.push(file);
            //     next();
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //   });
          } else {
            next();
          }
        })
      )
      .pipe(gulp.dest(outDir));
  };
}
