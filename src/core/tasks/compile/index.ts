import gulp from 'gulp';
import buildLess from '../less';
import buildTsx from '../tsx';
import { getProjectPath } from '../../utils';

const sourceGlob = {
  styles: ['components/**/*.less'],
};

const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

export default function compile(target: 'es' | 'lib') {
  const outDir = target === 'es' ? esDir : libDir;
  return gulp.parallel(
    buildLess({
      sourceDir: sourceGlob['styles'],
      outDir: outDir,
    }),
    buildTsx()
  );
}
