#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const commander_1 = require("commander");
const loadTasks_1 = require("./utils/loadTasks");
const utils_1 = require("./utils");
function runTask(taskName, rest = []) {
    const metadata = { task: taskName, hrDuration: [0, 0] };
    // 只 转入名称会返回 注册的函数
    const taskInstance = gulp_1.default.task(taskName);
    if (taskInstance === undefined) {
        gulp_1.default.emit('task_not_found', metadata);
        return;
    }
    const start = process.hrtime();
    gulp_1.default.emit('task_start', metadata);
    try {
        Reflect.apply(taskInstance, gulp_1.default, rest);
        metadata.hrDuration = process.hrtime(start);
        gulp_1.default.emit('task_stop', metadata);
        gulp_1.default.emit('stop');
    }
    catch (err) {
        err.hrDuration = process.hrtime(start);
        err.task = metadata.task;
        gulp_1.default.emit('task_err', err);
    }
}
async function main() {
    commander_1.program.on('--help', () => {
        console.log('  Usage:');
        console.log();
    });
    commander_1.program.allowUnknownOption().parse(process.argv);
    const [task, ...rest] = commander_1.program.args;
    if (!task) {
        commander_1.program.help();
    }
    else {
        await (0, loadTasks_1.loadTasks)({
            cwd: (0, utils_1.resolveCore)('tasks'),
        });
        await (0, loadTasks_1.loadTasks)({
            cwd: (0, utils_1.resolveCore)('jobs'),
        });
        await Promise.resolve().then(() => __importStar(require('./gulpfile')));
        await runTask(task, rest);
    }
}
main();
//# sourceMappingURL=index.js.map