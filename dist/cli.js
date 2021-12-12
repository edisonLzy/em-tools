#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const pkg = require('../package.json');
commander_1.program
    .version(pkg.version)
    .command('run [name]', 'run specified task', {
    executableFile: path_1.default.resolve(__dirname, './core/index.js'),
})
    .parse(process.argv);
const subCmd = commander_1.program.args[0];
if (!subCmd || subCmd !== 'run') {
    commander_1.program.help();
}
