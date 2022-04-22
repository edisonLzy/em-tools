import less from 'less';
import { readFileSync } from 'fs';
import path from 'path';
import postcss from 'postcss';
import NpmImportPlugin from 'less-plugin-npm-import';
import autoprefixer from 'autoprefixer';

interface Config {
  cwd: string;
}
export function transformLess(
  lessFile: string,
  config: Config = {
    cwd: process.cwd(),
  }
) {
  const { cwd } = config;
  const resolvedLessFile = path.resolve(cwd, lessFile);
  console.log(resolvedLessFile);

  let data = readFileSync(resolvedLessFile, 'utf-8');
  data = data.replace(/^\uFEFF/, '');

  // Do less compile
  const lessOpts = {
    paths: [path.dirname(resolvedLessFile)],
    filename: resolvedLessFile,
    plugins: [new NpmImportPlugin({ prefix: '~' })],
    javascriptEnabled: true,
  };

  return less
    .render(data, lessOpts)
    .then((result) =>
      postcss([autoprefixer]).process(result.css, { from: undefined })
    )
    .then((r) => {
      return r.css;
    });
}
