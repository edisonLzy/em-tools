import path from 'path';
import { chunk, replace } from 'lodash';

const cwd = process.cwd();

export function getProjectPath(...filePath: string[]) {
  return path.join(cwd, ...filePath);
}

export function resolveCore(...filePath: string[]) {
  return path.resolve(__dirname, '..', ...filePath);
}

export function resolveArgs(args: string[]) {
  return chunk(args).reduce<Record<string, string>>((acc, cur) => {
    const [key, value = ''] = cur;
    const _key = replace(key, '-', '');
    acc[_key] = value;
    return acc;
  }, {});
}
