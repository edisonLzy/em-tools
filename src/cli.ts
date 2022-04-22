#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
const pkg = require('../package.json');

program
  .version(pkg.version)
  .allowUnknownOption()
  .command('run [name]', 'run specified task', {
    executableFile: path.resolve(__dirname, './core/index.js'),
  })
  .parse(process.argv);

const subCmd = program.args[0];
if (!subCmd || subCmd !== 'run') {
  program.help();
}
